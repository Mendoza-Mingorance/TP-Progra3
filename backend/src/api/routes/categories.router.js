import { Router } from 'express';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
} from '../controllers/categories.controller.js';
import { auth } from '../middlewares/auth.js';
const router = Router();

router.get('/', getCategories);

router.post('/', auth, createCategory);

router.route('/:id')
    .get(getCategoriesById)
    .put(auth, updateCategory)
    .delete(auth, deleteCategory);

export default router;
