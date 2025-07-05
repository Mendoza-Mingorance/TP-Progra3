import { fetchProductByID, fetchProductsModel, updateProductModel } from "../models/products.model.js";
import { verifyToken } from "../utils/utils.js";

export const loginView = (req, res) =>{
    const token = verifyToken(req.cookies.jwt)  
    token? res.redirect('/admin/dashboard'): res.render('login')
}

export const dashboardView = async (req, res) =>{
    try {
        const adminData = req.user
        const productsData = await fetchProductsModel(req.query);
        const products = productsData.data

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
    const adminData = req.user;
    const { id } = req.query;
    
    let product = null;
    let error = false;

    if (id) {
        const result = await fetchProductByID(id);
        
        product = result[0] || null;
        error = result.length === 0;
    }

    res.render('modificaciones', { adminData, product, error });
};

export const updateProductPost = async (req, res) => {
  try {
    const adminData = req.user;
    const { id, ...fieldsToUpdate } = req.body;
    
    await updateProductModel(id, fieldsToUpdate);

    const [product] = await fetchProductByID(id);
    
    const error = product.length === 0;

    res.render('modificaciones', { adminData, product, error });
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    res.status(500).render('modificaciones', { adminData: req.user, error: true });
  }
};

export const deleteProductView = async (req, res) => {
    const adminData = req.user
    const { id } = req.body
    try {
        await updateProductModel(id, {available: "inactive"})
        const productsData = await fetchProductsModel(req.query);
        const products = productsData.data
        
        res.render('dashboard', {adminData, products})
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ message: "Internal server error. Couldn't delete product" });
    }
}

export const usersView = async (req, res) => {
    const adminData = req.user
    res.render('users', {adminData})
}