import { Router } from 'express';
import {
    changeProductsAvailable,
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    getProductsActive,
    getProductsInactive,
    updateProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.route('/').get(getProducts).post(createProduct);

router.get('/active', getProductsActive);
router.get('/inactive', getProductsInactive);
router.patch('/status/:id', changeProductsAvailable);

router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct);

export default router;
