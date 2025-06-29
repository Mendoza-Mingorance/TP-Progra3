import { connection } from '../database/db.js';
import ExcelJS from 'exceljs';

export const getSales = async (req, res) => {
    try {
        const sql = `SELECT * FROM sales`;
        const [result] = await connection.query(sql);

        res.status(200).json(result);
    } catch (err) {
        console.error('Error trayendo ventas: ', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get sales" });
    }
};

export const getSalesWithProducts = async (req, res) => {
    try {
        const sql = `
        SELECT 
        s.id as saleid,
        s.name_client,
        s.amount_total,
        s.payment_method,
        s.createdAt,
        ps.id_products,
        ps.quantity,
        ps.amount_unit,
        p.name as productname,
        p.url_image
        FROM sales s
        JOIN products_sales ps ON s.id = ps.id_sales
        JOIN products p ON ps.id_products = p.id
        `;
        const [result] = await connection.query(sql);
        // console.log(result);
        const salesObj = {};
        for (const ele of result) {
            if (!salesObj[ele.saleid]) {
                salesObj[ele.saleid] = {
                    id: ele.saleid,
                    name_client: ele.name_client,
                    amount_total: ele.amount_total,
                    payment_method: ele.payment_method,
                    createdAt: ele.createdAt,
                    products: [],
                };
            }
            salesObj[ele.saleid].products.push({
                id: ele.id_products,
                name: ele.productname,
                quantity: ele.quantity,
                amount_unit: ele.amount_unit,
                image: ele.url_image,
            });
        }
        res.status(200).json(Object.values(salesObj));
    } catch (err) {
        console.error('Error trayendo ventas: ', err.message);
        res.status(500).json({
            message: "Internal server error. Couldn't get sales with your product",
        });
    }
};

export const createSales = async (req, res) => {
    try {
        const { name, payment_method, products } = req.body;

        const methodPaymentValid = ['cash', 'credit_card', 'debit_card', 'transfer'];

        if (
            !name ||
            !methodPaymentValid.includes(payment_method) ||
            !Array.isArray(products) ||
            products.length === 0
        ) {
            return res.status(400).json({ message: 'Datos incompletos o invalidados' });
        }

        for (const p of products) {
            const [[resultStock]] = await connection.query(`SELECT * FROM products WHERE id = ?`, [
                p.id,
            ]);
            if (!resultStock)
                return res.status(404).json({ message: `Producto ${p.id} inexistente` });
            if (resultStock.stock < p.quantity)
                return res.status(404).json({ message: `Stock insuficiente` });
        }

        const total = products.reduce((acc, p) => acc + p.amount_unit * p.quantity, 0);

        const [result] = await connection.query(
            `INSERT INTO sales (name_client, amount_total, payment_method) VALUES (?,?,?)`,
            [name, total, payment_method]
        );

        const salesId = result.insertId;

        //Sacar resultUpdate cuando todo este funcionando
        const resultUpdate = [];

        for (const p of products) {
            await connection.query(
                `INSERT INTO products_sales(id_products,id_sales,quantity,amount_unit) VALUES (?,?,?,?)`,
                [p.id, salesId, p.quantity, p.amount_unit]
            );

            await connection.query(
                `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`,
                [p.quantity, p.id, p.quantity]
            );
            //Verificacion provicional para ver si actualiza el stock
            const [updated] = await connection.query(`SELECT * FROM products WHERE id = ?`, [p.id]);
            resultUpdate.push(updated[0]);
        }

        res.status(200).json({
            message: `Venta completada exitosamente por ${name}`,
            id: salesId,
            payload: resultUpdate,
        });
    } catch (err) {
        console.error('Error creando ventas: ', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't create sales" });
    }
};

export const exportSaleExcel = async (req, res) => {
    try {
        const sql = `
        SELECT 
            s.id as saleid,
            s.name_client,
            s.amount_total,
            s.payment_method,
            s.createdAt,
            ps.id_products,
            ps.quantity,
            ps.amount_unit,
            p.name as productname,
            p.description
        FROM sales s
        JOIN products_sales ps ON s.id = ps.id_sales
        JOIN products p ON ps.id_products = p.id
        `;
        const [result] = await connection.query(sql);

        const bookExcel = new ExcelJS.Workbook(); //Se Crea archivo excel
        const sheetsExcel = bookExcel.addWorksheet('Ventas'); //Se crea la hoja

        sheetsExcel.columns = [
            //Se organizan las columnas
            { header: 'ID', key: 'saleid', width: 5 },
            { header: 'Cliente', key: 'name_client', width: 20 },
            { header: 'Total', key: 'amount_total', width: 15 },
            { header: 'Metodo de Pago', key: 'payment_method', width: 15 },
            { header: 'Fecha', key: 'createdAt', width: 15 },
            { header: 'Producto', key: 'productname', width: 25 },
            { header: 'Descripcion', key: 'description', width: 40 },
            { header: 'Cantidad', key: 'quantity', width: 10 },
            { header: 'Precio Unitario', key: 'amount_unit', width: 15 },
        ];

        for (let i = 0; i < result.length; i++) {
            const ele = result[i];
            sheetsExcel.addRow(ele);
        }

        sheetsExcel.getRow(1).font = { bold: true }; // Encabezado en negrita
        sheetsExcel.getColumn('amount_total').numFmt = '"$"#,##0.00';
        sheetsExcel.getColumn('amount_unit').numFmt = '"$"#,##0.00';

        //Configuracion para que el navegador entienda se envia un excel
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        //Configuracion para forzar que se descargue el excel
        res.setHeader('Content-Disposition', 'attachment; filename="ventas.xlsx"');

        await bookExcel.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error('Error exportando Excel: ', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't export sales." });
    }
};
