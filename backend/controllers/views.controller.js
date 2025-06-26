import { fetchProducts } from "../services/products.services.js";

export const loginView = (req, res) =>{
    res.render('login')
}

export const dashboardView = async (req, res) =>{
        try {
        const products = await fetchProducts(req.query);
        res.render('dashboard', { products });
    } catch (error) {
        res.status(500).render('error', { message: 'No se pudieron cargar los productos' });
    }
    res.render('dashboard')
}

export const createProductView = async (req, res) =>{
    res.render('createProduct')
}

export const updateProductView = async (req, res) => {
    res.render('updateProduct')
}

export const deleteProductView = async (req, res) => {
    res.render('deleteProduct')
}