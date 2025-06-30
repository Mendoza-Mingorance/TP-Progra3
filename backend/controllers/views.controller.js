import { fetchProductsModel } from "../models/products.model.js";
import { verifyToken } from "../utils/utils.js";

export const loginView = (req, res) =>{
    const token = verifyToken(req.cookies.jwt)  
    token? res.redirect('/admin/dashboard'): res.render('login')
}

export const dashboardView = async (req, res) =>{
    try {
        const adminData = req.user
        const products = await fetchProductsModel(req.query);
        res.status(200).render('dashboard', { products, adminData });
    } catch (error) {
        res.status(500).render('error', { message: 'No se pudieron cargar los productos' });
    }
}

export const createProductView = async (req, res) =>{
    const adminData = req.user
    res.render('altas', {adminData})
}

export const updateProductView = async (req, res) => {
    const adminData = req.user
    res.render('modificaciones', {adminData})
}

export const deleteProductView = async (req, res) => {
    res.render('deleteProduct')
}

export const usersView = async (req, res) => {
    const adminData = req.user
    res.render('users', {adminData})
}