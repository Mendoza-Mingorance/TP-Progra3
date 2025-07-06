import { Router } from 'express';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
} from '../controllers/categories.controller.js';
const router = Router();

router.get('/', getCategories);

router.post('/', createCategory);

router.route('/:id').get(getCategoriesById).put(updateCategory).delete(deleteCategory);

export default router;
