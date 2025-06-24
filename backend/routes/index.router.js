import {Router} from 'express'
import productsRouter from "./products.router.js";
import viewsRouter from './views.router.js';
import usersRouter from './users.router.js';


const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/users', usersRouter)
router.use('/admin', viewsRouter)

export default router

