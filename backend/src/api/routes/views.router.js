import {Router} from 'express'
import { activateProductView, createProductView, dashboardView, deactivateProductView, deleteProductView, deleteUser, loginView, registerUser, updateProductPost, updateProductView, usersView } from '../controllers/views.controller.js'
import { auth } from '../middlewares/auth.js'
import { uploadFile } from '../middlewares/uploadImg.js'


const router = Router()

router.get('/', loginView)
router.get('/admin/dashboard', auth(['admin', 'manager']), dashboardView )
router.get('/admin/altas', auth(['admin', 'manager']), createProductView)
router.get('/admin/modificaciones/', auth(['admin', 'manager']), updateProductView)
router.post('/admin/modificaciones/update', auth(['admin', 'manager']), uploadFile.single('image'),updateProductPost);
router.get('/admin/usuarios', auth(['admin']), usersView)
router.post('/admin/users/create', auth(['admin']), registerUser)
router.post('/admin/users/delete/:id', auth(['admin']), deleteUser)
router.post('/admin/products/deactivate/:id', auth(['admin', 'manager']), deactivateProductView);
router.post('/admin/products/delete/:id', auth(['admin']), deleteProductView);
router.post('/admin/products/activate/:id', auth(['admin', 'manager']), activateProductView);


export default router