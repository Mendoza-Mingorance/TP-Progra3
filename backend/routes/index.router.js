import {Router} from 'express'
import productsRouter from "./products.router.js";
import viewsRouter from './views.router.js';


const router = Router()

router.use('/api/products', productsRouter)
router.use('/admin', viewsRouter)

export default router

