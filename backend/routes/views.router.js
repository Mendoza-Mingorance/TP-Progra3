import {Router} from 'express'
import { createProductView, dashboardView, loginView, updateProductView, usersView } from '../controllers/views.controller.js'
import { auth } from '../middlewares/auth.js'


const router = Router()

router.get('/', loginView)
router.get('/dashboard', auth, dashboardView )

router.get('/altas', auth, createProductView)
router.get('/modificaciones', auth, updateProductView)
router.get('/usuarios', auth, usersView)


export default router