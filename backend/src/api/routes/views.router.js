import {Router} from 'express'
import { createProductView, dashboardView, loginView, updateProductView, usersView } from '../controllers/views.controller.js'
import { auth } from '../middlewares/auth.js'


const router = Router()

router.get('/', loginView)
router.get('/admin/dashboard', auth, dashboardView )

router.get('/admin/altas', auth, createProductView)
router.get('/admin/modificaciones', auth, updateProductView)
router.get('/admin/usuarios', auth, usersView)


export default router