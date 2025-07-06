import {
    createCategoryModel,
    deleteCategoryModel,
    fetchCategoriesByIdModel,
    fetchCategoriesModel,
    updateCategoryModel,
} from '../models/categories.model.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await fetchCategoriesModel();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error trayendo las catergorias: ', error.message);
        res.status(500).json({ message: 'No se pudo traer las categorias' });
    }
};

export const getCategoriesById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await fetchCategoriesByIdModel(id);
        category.length > 0
            ? res.status(200).json(category)
            : res.status(404).json({ message: `Categoria de id ${id} no encontrado` });
    } catch (error) {
        console.error('Error al traer categoria por ID: ', error.message);
        res.status(500).json({ message: 'No se pudo traer las categoria por ID' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre es requerido' });
        }

        const newCategory = { name, description };
        const result = await createCategoryModel(newCategory);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error creando la categoria: ', error.message);
        res.status(500).json({ message: 'Error al crear categoria' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const fields = req.body;
        if (isNaN(id)) return res.status(400).json({ message: `ID ${id} invalido` });

        const result = await updateCategoryModel(id, fields);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria no existe' });
        }

        const updated = await fetchCategoriesByIdModel(id);
        res.status(200).json({
            message: 'Categoria actualizada',
            payload: updated,
        });
    } catch (error) {
        console.error('Error modificando categoria', error.message);
        res.status(500).json({ message: 'Error al modificar la categoria' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCategoryModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria no existe' });
        }

        res.status(200).json({ message: `Categoria de id ${id} eliminada con exito` });
    } catch (error) {
        console.error('Error eliminando categoria: ', error.message);
        throw new Error({ message: 'Error al eliminar categoria' });
    }
};
