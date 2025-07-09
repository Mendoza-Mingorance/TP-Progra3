import { Router } from 'express';
import { createSale, exportSaleExcel, getSaleById, getSales, getSalesWithProducts } from '../controllers/sales.controller.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/', createSale)
router.get('/', auth(['admin', 'manager']), getSales);
router.get('/products', auth(['admin', 'manager']), getSalesWithProducts)

router.get('/export', auth(['admin', 'manager']), exportSaleExcel)
router.get('/:id', auth(['admin', 'manager']), getSaleById)

export default router;