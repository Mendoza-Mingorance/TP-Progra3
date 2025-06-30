import ExcelJS from 'exceljs';
import { createSaleModel, fetchSaleByID, fetchSalesModel, fetchSalesWithProductsModel } from '../models/sales.model.js';
import { fetchProductByID } from '../models/products.model.js';

export const getSales = async (req, res) => {
    try {
        const result = await fetchSalesModel();
        res.status(200).json(result);
    } catch (err) {
        console.error('Error trayendo ventas: ', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get sales" });
    }
};

export const getSalesWithProducts = async (req, res) => {
    try {
        const result = await fetchSalesWithProductsModel();
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

export const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await fetchSaleByID(id);

        const saleObj = {};
        for (const ele of result) {
            if (!saleObj[ele.saleid]) {
                saleObj[ele.saleid] = {
                    id: ele.saleid,
                    name_client: ele.name_client,
                    amount_total: ele.amount_total,
                    payment_method: ele.payment_method,
                    createdAt: ele.createdAt,
                    products: [],
                };
            }
            saleObj[ele.saleid].products.push({
                id: ele.id_products,
                name: ele.productname,
                quantity: ele.quantity,
                amount_unit: ele.amount_unit,
                image: ele.url_image,
            });
        }

        res.status(200).json(saleObj);
    } catch (err) {
        console.error('Error trayendo venta por id: ', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get sales" });
    }
}

export const createSale = async (req, res) => {
    try {
        const { name, payment_method, products } = req.body;

        const methodPaymentValid = ['cash', 'credit_card', 'debit_card', 'transfer'];

        if (
            !name ||
            !methodPaymentValid.includes(payment_method) ||
            !Array.isArray(products) ||
            products.length === 0
        ) {
            return res.status(400).json({ message: 'Datos incompletos o inválidos' });
        }

        for (const p of products) {
            const product = await fetchProductByID(p.id);
            if (!product)
                return res.status(404).json({ message: `Producto con ID ${p.id} no encontrado` });
            if (product.stock < p.quantity)
                return res.status(400).json({ message: `Stock insuficiente para ${product.name}, id: ${p.id}` });
        }

        const total = products.reduce((acc, p) => acc + p.amount_unit * p.quantity, 0);

        const { saleId, resultUpdate } = await createSaleModel(name, total, payment_method, products);

        res.status(200).json({
            message: `Venta completada exitosamente por ${name}`,
            id: saleId,
            payload: resultUpdate,
        });
    } catch (error) {
        console.error('Error en controlador de ventas:', error.message);
        res.status(500).json({ message: 'Error procesando la venta' });
    }
};
export const exportSaleExcel = async (req, res) => {
    try {
        const result = await fetchSalesWithProductsModel();

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
