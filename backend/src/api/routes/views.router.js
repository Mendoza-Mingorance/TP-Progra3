import {Router} from 'express'
import { createProductView, dashboardView, loginView, updateProductPost, updateProductView, usersView } from '../controllers/views.controller.js'
import { auth } from '../middlewares/auth.js'
import { uploadFile } from '../middlewares/uploadImg.js'


const router = Router()

router.get('/', loginView)
router.get('/admin/dashboard', auth, dashboardView )

router.get('/admin/altas', auth, createProductView)
router.get('/admin/modificaciones/', auth, updateProductView)
router.post('/admin/modificaciones/update', auth, uploadFile.single('image'),updateProductPost);
router.get('/admin/usuarios', auth, usersView)


export default router