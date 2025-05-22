import { Category } from '../../models/categoryModel.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});

        const result = {
            incomes: [],
            expenses: [],
        };

        for (const category of categories) {
            if (category.type === 'income') {
                result.incomes.push(category.name);
            } else if (category.type === 'expense') {
                result.expenses.push(category.name);
            }
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};