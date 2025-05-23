import { getCategoriesService } from '../../services/categories/categoriesService.js';

export const getCategoriesController = async (req, res, next) => {
    try {
        const categories = await getCategoriesService();

        res.status(200).json({
            status: 200,
            message: 'Categories fetched successfully',
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};
