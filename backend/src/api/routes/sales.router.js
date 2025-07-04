import { Router } from 'express';
import { createSale, exportSaleExcel, getSaleById, getSales, getSalesWithProducts } from '../controllers/sales.controller.js';

const router = Router();

router.post('/', createSale)
router.get('/', getSales);
router.get('/products', getSalesWithProducts)

router.get('/export', exportSaleExcel)
router.get('/:id', getSaleById)

export default router;