import { fetchProducts } from "../services/products.services.js";
import { verifyToken } from "../utils/utils.js";

export const loginView = (req, res) =>{
    const token = verifyToken(req.cookies.jwt)
    
    token? res.redirect('dashboard'): res.render('login')
}

export const dashboardView = async (req, res) =>{
    try {
        const products = await fetchProducts(req.query);
        res.status(200).render('dashboard', { products });
    } catch (error) {
        res.status(500).render('error', { message: 'No se pudieron cargar los productos' });
    }
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