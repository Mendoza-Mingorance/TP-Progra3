import { conectionInitialDatabase, connection } from '../database/db.js';

export const fetchProductsModel = async queryParams => {
    try {
        const { name, available, id_category, minPrice, maxPrice, sort, order, limit, offset } =
            queryParams;

        const sortValids = ['name', 'price', 'stock'];
        const orderValid = ['asc', 'desc'];

        let sql = `SELECT p.id, 
            p.name, 
            p.price, 
            p.description, 
            p.url_image, 
            p.available, 
            p.stock,
            c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.id_category = c.id WHERE 1=1`;

        let countSql = `SELECT COUNT(*) as total FROM products p WHERE 1=1`;

        const filters = [];
        const countFilters = [];

        const applyFilters = (condition, value) => {
            sql += condition;
            countSql += condition;
            filters.push(value);
            countFilters.push(value);
        };

        if (available) applyFilters(` AND available = ?`, available);
        if (id_category) applyFilters(` AND id_category = ?`, id_category);
        if (minPrice) applyFilters(` AND price >= ?`, minPrice);
        if (maxPrice) applyFilters(` AND price <= ?`, maxPrice);
        if (name) applyFilters(` AND name LIKE ?`, `%${name}%`);

        const sortBy = connection.escapeId(sortValids.includes(sort) ? sort : 'name');
        const sortOrder = orderValid.includes(order?.toLowerCase()) ? order.toUpperCase() : 'ASC';

        sql += ` ORDER BY ${sortBy} ${sortOrder}`;

        if (limit) {
            sql += ` LIMIT ?`;
            filters.push(Number(limit));
        }

        if (offset) {
            sql += ` OFFSET ?`;
            filters.push(Number(offset));
        }

        const [rows] = await connection.query(sql, filters);
        const [[countResult]] = await connection.query(countSql, countFilters);
        return {
            data: rows,
            total: countResult.total,
            limit: limit ? Number(limit) : null,
            offset: offset ? Number(offset) : null,
        };
    } catch (error) {
        console.error('Error en modelo, trayendo productos:', error.message);
        throw new Error('Error trayendo productos del modelo');
    }
};

export const fetchActiveProductsModel = async () => {
    try {
        const sql = `SELECT * FROM products WHERE available = "active"`;
        const [rows] = await connection.query(sql);
        return rows;
    } catch (error) {
        console.error('Error en modelo trayendo productos activos:', error.message);
        throw new Error('Error trayendo productos activos del modelo');
    }
};

export const fetchInactiveProductsModel = async () => {
    try {
        const sql = `SELECT * FROM products WHERE available = "inactive"`;
        const [rows] = await connection.query(sql);
        return rows;
    } catch (error) {
        console.error('Error en modelo trayendo productos inactivos:', error.message);
        throw new Error('Error trayendo productos inactivos del modelo');
    }
};

export const fetchProductByID = async id => {
    try {
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error en modelo trayendo producto por id:', error.message);
        throw new Error('Error trayendo producto por id del modelo');
    }
};

export const updateProductStatus = async (status, id) => {
    try {
        const sql = `UPDATE products SET available = ? WHERE id = ?`;
        return await connection.query(sql, [status, id]);
    } catch (error) {
        console.error('Error en modelo actualizando el status del producto:', error.message);
        throw new Error('Error actualizando el status del producto del modelo');
    }
};

export const createProductModel = async productsValues => {
    try {
        const { name, price, description, url_image, id_category, available, stock } =
            productsValues;
        const sql = 'INSERT INTO products SET ?';

        const [result] = await connection.query(sql, productsValues);

        return { id: result.insertId, ...productsValues };
    } catch (error) {
        console.error('Error en modelo creando producto:', error.message);
        throw new Error('Error creando producto en el modelo');
    }
};

export const updateProductModel = async (id, fields) => {
    const conn = await connection.getConnection();
    try {
        await conn.beginTransaction();
        const columns = [];
        const values = [];

        for (const key in fields) {
            columns.push(`${key} = ?`);
            values.push(fields[key]);
        }

        values.push(id);

        const sql = `UPDATE products SET ${columns.join(', ')} WHERE id = ?`;
        const [result] = await connection.query(sql, values);
        await conn.commit();
        return result;
    } catch (error) {
        if (conn) await conn.rollback();
        console.error('Error en modelo actualizando producto:', error.message);
        throw new Error('Error actualizando producto en el modelo');
    } finally {
        conn.release();
    }
};

export const deleteProductModel = async id => {
    try {
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await connection.query(sql, [id]);
        return result;
    } catch (error) {
        console.error('Error en modelo eliminando producto:', error.message);
        throw new Error('Error eliminando producto en el modelo');
    }
};

export const validationStock = async () => {
    try {
        const sql = `UPDATE products SET available = 'out of stock' WHERE stock <= 0 and available != 'out of stock'`;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        console.error('Error en modelo validando stock:', error.message);
        throw new Error('Error validando stock en el modelo');
    }
};
