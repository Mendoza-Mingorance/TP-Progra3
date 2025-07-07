import { connection } from '../database/db.js';

export const fetchSalesModel = async () => {
    try {
        const sql = `SELECT * FROM sales`;
        const [result] = await connection.query(sql);
        return result
    } catch (error) {
        console.error('Error en modelo trayendo ventas:', error.message);
        throw new Error("Error trayendo ventas del modelo");
        
    }
}

export const fetchSalesWithProductsModel = async () => {
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
        return result
    } catch (error) {
        console.error('Error en modelo trayendo ventas con productos:', error.message);
        throw new Error("Error trayendo ventas con productos del modelo");     
    }
}
export const fetchSaleByID = async (id) => {
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
        WHERE s.id = ?
        `;
        const [result] = await connection.query(sql,[id]);
        return result
    } catch (error) {
        console.error('Error en modelo trayendo ventas con productos:', error.message);
        throw new Error("Error trayendo ventas con productos del modelo");     
    }
}

export const createSaleModel = async (name, total, payment_method, products) => {
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();

        const [saleResult] = await conn.query(
            'INSERT INTO sales (name_client, amount_total, payment_method) VALUES (?, ?, ?)',
            [name, total, payment_method]
        );

        const saleId = saleResult.insertId;
        const resultUpdate = [];

        for (const p of products) {
            await conn.query(
                `INSERT INTO products_sales (id_products, id_sales, quantity, amount_unit) VALUES (?, ?, ?, ?)`,
                [p.id, saleId, p.quantity, p.price]
            );

            const [result] = await conn.query(
                `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`,
                [p.quantity, p.id, p.quantity]
            );

            const [updated] = await connection.query(`SELECT * FROM products WHERE id = ?`, [p.id]);
            resultUpdate.push(updated[0]);

            if (result.affectedRows === 0) {
                throw new Error(`Stock insuficiente o producto inexistente para ID ${p.id}`);
            }
        }

        await conn.commit();
        return { saleId, resultUpdate };
    } catch (error) {
        await conn.rollback();
        console.error('Error en modelo creando venta:', error.message);
        throw new Error("Error creando venta en el modelo");  
    } finally {
        conn.release();
    }
}