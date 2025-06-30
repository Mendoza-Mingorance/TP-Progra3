import { connection } from '../database/db.js';
import { createProductModel, deleteProductModel, fetchActiveProductsModel, fetchInactiveProductsModel, fetchProductByID, fetchProductsModel, updateProductModel, updateProductStatus } from '../models/products.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await fetchProductsModel(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error trayendo productos:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProductsActive = async (req, res) => {
    try {
        /* Habria que mover esta validacion para otro lado */
        const validationStock = `UPDATE products SET available = 'out of stock' WHERE stock <= 0 and available != 'out of stock'`;
        await connection.query(validationStock);
        /* ---------------- */
        
        const [rows] = await fetchActiveProductsModel()
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error trayendo productos activos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get products" });
    }
};

export const getProductsInactive = async (req, res) => {
    try {
        const rows = await fetchInactiveProductsModel()
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error trayendo productos inactivos:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get products" });
    }
};

export const changeProductsAvailable = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const statusValid = ['active', 'inactive'];
        if (!statusValid.includes(status)) {
            return res.status(400).json({ message: 'Estado no válido.' });
        }

        await updateProductStatus(status, id)
        res.status(200).json({ message: `Producto ${id} cambio de estatus a ${status}` });
    } catch (err) {
        console.error('Error actualizando available status del producto:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't update products" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await fetchProductByID(id)
        rows.length > 0
            ? res.status(200).json(rows)
            : res.status(404).json({ message: `producto de id ${id} no encontrado` });
    } catch (err) {
        console.error('Error trayendo producto por id:', err.message);
        res.status(500).json({ message: "Internal server error. Couldn't get product" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, id_category, stock } = req.body;
        const available = stock <= 0 ? 'out of stock' : 'active';
        const url_image = req.file?.filename || '';

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
        
        const result = await createProductModel(name, price, description, url_image, id_category, available, stock);
        
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
        console.error('Error creando producto:', error.message);
        res.status(500).json({ message: "Internal server error. Couldn't create product." });
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

        const result = await updateProductModel(id, fields);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Producto con id: ${id} no encontrado`,
            });
        }

        const updated = await fetchProductByID(id);

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
        const result = await deleteProductModel(id)
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Producto con id: ${id} no encontrado`,
            });
        }

        res.status(200).json({ message: `Producto de ID: ${id} eliminado.` });
    } catch (err) {
        console.error('Error eliminando producto: ', err);
        res.status(500).json({ message: "Internal server error. Couldn't create product" });
    }
};
