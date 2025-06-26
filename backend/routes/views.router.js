import {Router} from 'express'
import { dashboardView, loginView } from '../controllers/views.controller.js'


const router = Router()

router.get('/', loginView)
router.get('/dashboard', dashboardView )


export default router