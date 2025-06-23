import {Router} from 'express'
import productsRouter from "./products.router.js";

const router = Router()

router.use('/api/products', productsRouter)

export default router

