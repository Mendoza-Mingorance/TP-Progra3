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

const router = Router();

router.get('/', getProducts);
router.post('/', uploadFile.single('image'), createProduct);

router.get('/active', getProductsActive);
router.get('/inactive', getProductsInactive);
router.patch('/status/:id', changeProductsAvailable);

router.get('/:id', getProductById);
router.put('/:id',  uploadFile.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
