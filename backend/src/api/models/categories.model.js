import { connection } from '../database/db.js';

export const fetchCategoriesModel = async () => {
    try {
        let sql = `SELECT * FROM categories`;

        const [rows] = await connection.query(sql);

        return rows;
    } catch (error) {
        console.error('Error en modelo, trayendo categorias:', error.message);
        throw new Error('Error trayendo categorias del modelo');
    }
};

export const fetchCategoriesByIdModel = async id => {
    try {
        let sql = `SELECT * FROM categories WHERE id = ?`;

        const [rows] = await connection.query(sql, [id]);

        return rows;
    } catch (error) {
        console.error('Error en modelo, trayendo categorias:', error.message);
        throw new Error('Error trayendo categoria por ID del modelo');
    }
};

export const createCategoryModel = async category => {
    try {
        const sql = `INSERT INTO categories SET ?`;

        const [result] = await connection.query(sql, category);

        return { id: result.insertId, ...category };
    } catch (error) {
        console.error('Error en modelo, creando categoria: ', error.message);
        throw new Error('Error creando categoria del modelo');
    }
};

export const updateCategoryModel = async (id, fields) => {
    try {
        const columns = [];
        const values = [];

        for (const key in fields) {
            columns.push(`${key} = ?`);
            values.push(fields[key]);
        }

        values.push(id);

        const sql = `UPDATE categories SET ${columns.join(', ')} WHERE id = ?`;
        const [result] = await connection.query(sql, values);

        return result;
    } catch (error) {
        console.error('Error modificando Categoria: ', error.message);
        throw new Error('Error modificando la categoria');
    }
};

export const deleteCategoryModel = async id => {
    try {
        const sql = `DELETE FROM categories WHERE id= ?`;

        const [result] = await connection.query(sql, [id]);
        
        return result;
    } catch (error) {
        console.error('Error eliminando Categoria: ', error.message);
        throw new Error('Error eliminando la categoria');
    }
};
