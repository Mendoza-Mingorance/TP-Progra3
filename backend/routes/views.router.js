import {Router} from 'express'
import { dashboardView, loginView } from '../controllers/views.controller.js'
import { auth } from '../middlewares/auth.js'


const router = Router()

router.get('/', loginView)
router.get('/dashboard', auth, dashboardView )


export default router