import { connection } from '../database/db.js';

export const getProducts = async (req, res) => {
    try {
        const sql = `SELECT * FROM products`;
        const [rows] = await connection.query(sql);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error trayendo productos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get products" });
    }
};

export const getProductsActive = async (req, res) => {
    try {
        const validationStock = `UPDATE products SET available = 'out of stock' WHERE stock <= 0 and available != 'out of stock'`;

        await connection.query(validationStock);

        const sql = `SELECT * FROM products WHERE available = "active"`;
        const [rows] = await connection.query(sql);

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error trayendo productos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get products" });
    }
};

export const getProductsInactive = async (req, res) => {
    try {
        const sql = `SELECT * FROM products WHERE available = "inactive"`;
        const [rows] = await connection.query(sql);

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error trayendo productos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get products" });
    }
};

export const changeProductsAvailable = async (req, res) => {
    try {
        const { id } = req.params;
        const {status} = req.body;

        const statusValid = ['active', 'inactive'];
        if (!statusValid.includes(status)) {
            return res.status(400).json({ message: 'Estado no válido.' });
        }

        const sql = `UPDATE products SET available = ? WHERE id = ?`;
        await connection.query(sql, [status, id]);
        res.status(200).json({ message: `Producto ${id} cambio de estatus a ${status}` });
    } catch (err) {
        console.error('Error actualizando productos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't update products" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);

        rows.length > 0
            ? res.status(200).json(rows)
            : res.status(404).json({ message: `producto de id ${id} no encontrado` });
    } catch (err) {
        console.error('Error trayendo producto:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get product" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, id_category, stock = 0 } = req.body;
        const available = stock <= 0 ? 'out of stock' : 'active'
        const url_image = req.file?.filename || "";

        const validStatus = ['active', 'inactive', 'out of stock'];

        if (
            !name ||
            !price ||
            !description ||
            !id_category ||
            typeof stock != 'number' ||
            !validStatus.includes(available)
        ) {
            return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
        }

        const sql =
            'INSERT INTO products (name, price, description, url_image, id_category, available, stock) VALUES (?, ?, ?, ?,?, ?, ?)';
        const values = [name, price, description, url_image, id_category, available, stock];

        const [result] = await connection.query(sql, values);

        res.status(200).json({
            message: `Producto creado con éxito`,
            payload: {
                id: result.insertId,
                name,
                price,
                description,
                url_image,
                id_category,
                available,
                stock,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error. Couldn't create product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const fields = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id invalido' });
        }

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No hay datos para actualizar' });
        }

        const columns = [];
        const values = [];

        for (const key in fields) {
            columns.push(`${key} = ?`);
            values.push(fields[key]);
        }

        values.push(id);

        const sql = `UPDATE products SET ${columns.join(', ')} WHERE id = ?`;
        const [result] = await connection.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Producto con id: ${id} no encontrado`,
            });
        }

        const [updated] = await connection.query(`SELECT * FROM products WHERE id = ?`, [id]);

        res.status(200).json({
            message: `Producto con id: ${id} se actualizo con exito`,
            payload: updated[0],
        });
    } catch (err) {
        console.error('Error actualizando producto:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't update product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Producto con id: ${id} no encontrado`,
            });
        }

        res.status(200).json({ message: `Producto de ID: ${id} eliminado.` });
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: "Internal server error. Couldn't create product" });
    }
};
