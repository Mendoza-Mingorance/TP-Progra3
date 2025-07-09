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
import { uploadFile } from '../middlewares/uploadImg.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/', getProducts);
router.post('/', auth(['admin', 'manager']), uploadFile.single('image'), createProduct);

router.get('/active', getProductsActive);
router.get('/inactive', getProductsInactive);
router.patch('/status/:id', auth(['admin', 'manager']), changeProductsAvailable);

router.get('/:id', getProductById);
router.put('/:id', auth(['admin', 'manager']), uploadFile.single('image'), updateProduct);
router.delete('/:id', auth(['admin']), deleteProduct);

export default router;
