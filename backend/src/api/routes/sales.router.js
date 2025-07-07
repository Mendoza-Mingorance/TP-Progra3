import { Router } from 'express';
import { createSale, exportSaleExcel, getSaleById, getSales, getSalesWithProducts } from '../controllers/sales.controller.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/', createSale)
router.get('/', auth, getSales);
router.get('/products', auth, getSalesWithProducts)

router.get('/export', auth, exportSaleExcel)
router.get('/:id', auth, getSaleById)

export default router;