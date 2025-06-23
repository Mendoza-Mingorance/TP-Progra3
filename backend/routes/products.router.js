import {Router} from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products.controller.js'

const router = Router()

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProduct)

export default router