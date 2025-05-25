import { Category } from "../../db/models/Categories.js";

export const getCategoriesService = async () => {
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

    return result;
};
