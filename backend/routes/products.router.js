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
import { upload } from '../middlewares/uploadImg.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/', getProducts);
router.post('/', upload.single('image'), createProduct);

router.get('/active', getProductsActive);
router.get('/inactive', getProductsInactive);
router.patch('/status/:id', changeProductsAvailable);

router.get('/:id', getProductById);
router.put('/:id', auth, upload.single('image'), updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;
