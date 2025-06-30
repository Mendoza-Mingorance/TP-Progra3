import { connection } from "../database/db.js";

export const fetchProductsModel = async (queryParams) => {
    try {
        const {
        name,
        available,
        id_category,
        minPrice,
        maxPrice,
        sort,
        order,
        limit,
        offset,
    } = queryParams;

    const sortValids = ['name', 'price', 'stock'];
    const orderValid = ['asc', 'desc'];

    let sql = `SELECT * FROM products WHERE 1=1`;
    const filters = [];

    if (available) {
        sql += ` AND available = ?`;
        filters.push(available);
    }

    if (id_category) {
        sql += ` AND id_category = ?`;
        filters.push(id_category);
    }

    if (minPrice) {
        sql += ` AND price >= ?`;
        filters.push(Number(minPrice));
    }

    if (maxPrice) {
        sql += ` AND price <= ?`;
        filters.push(Number(maxPrice));
    }

    if (name) {
        sql += ` AND name LIKE ?`;
        filters.push(`%${name}%`);
    }

    const sortBy = sortValids.includes(sort) ? sort : 'name';
    const sortOrder = orderValid.includes(order?.toLowerCase())
        ? order.toUpperCase()
        : 'ASC';

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
    
    return rows 
       
    } catch (error) {
        console.error('Error en modelo, trayendo productos:', error.message);
        throw new Error('Error trayendo productos del modelo');
    }
};

export const fetchActiveProductsModel = async () => {
    try {
        const sql = `SELECT * FROM products WHERE available = "active"`;
        return await connection.query(sql);
    } catch (error) {
        console.error('Error en modelo trayendo productos activos:', error.message);
        throw new Error('Error trayendo productos activos del modelo');
    }
}

export const fetchInactiveProductsModel = async () => {
    try {
        const sql = `SELECT * FROM products WHERE available = "inactive"`;
        const [rows] = await connection.query(sql);
        return rows
    } catch (error) {
        console.error('Error en modelo trayendo productos inactivos:', error.message);
        throw new Error('Error trayendo productos inactivos del modelo');
    }
}

export const fetchProductByID = async (id) =>{
    try {
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);
        return rows
    } catch (error) {
        console.error('Error en modelo trayendo producto por id:', error.message);
        throw new Error("Error trayendo producto por id del modelo");
    }
}

export const updateProductStatus = async (status, id) => {
    try {
        const sql = `UPDATE products SET available = ? WHERE id = ?`;
        return await connection.query(sql, [status, id]);
    } catch (error) {
        console.error('Error en modelo actualizando el status del producto:', error.message);
        throw new Error("Error actualizando el status del producto del modelo");
    }
    
}

export const createProductModel = async (name, price, description, url_image, id_category, available, stock) =>{
    try {
        const sql = 'INSERT INTO products (name, price, description, url_image, id_category, available, stock) VALUES (?, ?, ?, ?,?, ?, ?)';
        const values = [name, price, description, url_image, id_category, available, stock];
        
        const [result] = await connection.query(sql, values);
        
        return result    
    } catch (error) {
        console.error('Error en modelo creando producto:', error.message);
        throw new Error("Error creando producto en el modelo");
        
    }    
}

export const updateProductModel = async (id, fields) => {
    try {
        const columns = [];
        const values = [];

        for (const key in fields) {
            columns.push(`${key} = ?`);
            values.push(fields[key]);
        }

        values.push(id);

        const sql = `UPDATE products SET ${columns.join(', ')} WHERE id = ?`;
        const [result] = await connection.query(sql, values);
        return result
    } catch (error) {
        console.error('Error en modelo actualizando producto:', error.message);
        throw new Error("Error actualizando producto en el modelo");   
    }
}

export const deleteProductModel = async (id) =>{
    try {
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await connection.query(sql, [id]);
        return result
    } catch (error) {
        console.error('Error en modelo eliminando producto:', error.message);
        throw new Error("Error eliminando producto en el modelo");
    }
}
