import { Router } from 'express';
import { createSale, exportSaleExcel, getSaleById, getSales, getSalesWithProducts } from '../controllers/sales.controller.js';

const router = Router();

router.post('/', createSale)
/* Estructura para probar ruta POST
{  
  "name": "María Gonzalez",
  "payment_method": "credit_card",
  "products": [
    { "id": 1, "quantity": 2, "amount_unit": 499.99 },
    { "id": 3, "quantity": 1, "amount_unit": 699.99 }
  ]
}
*/ 
router.get('/', getSales);
router.get('/products', getSalesWithProducts)

// Probas la ruta directamente en el navegador http://localhost:8080/api/sales/export
router.get('/export', exportSaleExcel)
router.get('/:id', getSaleById)

export default router;