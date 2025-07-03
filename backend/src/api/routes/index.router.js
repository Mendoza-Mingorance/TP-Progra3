import {Router} from 'express'
import productsRouter from "./products.router.js";
import viewsRouter from './views.router.js';
import usersRouter from './users.router.js';
import salesRouter from './sales.router.js';


const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/sales', salesRouter)
router.use('/api/users', usersRouter)
router.use('/', viewsRouter)

export default router

