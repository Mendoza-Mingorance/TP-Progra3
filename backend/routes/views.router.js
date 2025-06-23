import {Router} from 'express'
import { loginView } from '../controllers/views.controller.js'


const router = Router()

router.get('/', loginView)


export default router