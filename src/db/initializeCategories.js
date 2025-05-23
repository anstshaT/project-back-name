import { Category } from "./models/Categories.js";


export const initializeCategories = async () => {
    const existing = await Category.find({});
    if (existing.length === 0) {
        const categories = [
            { name: 'Incomes', type: 'income' },
            { name: 'Main expenses', type: 'expense' },
            { name: 'Products', type: 'expense' },
            { name: 'Car', type: 'expense' },
            { name: 'Self care', type: 'expense' },
            { name: 'Child care', type: 'expense' },
            { name: 'Household products', type: 'expense' },
            { name: 'Education', type: 'expense' },
            { name: 'Leisure', type: 'expense' },
            { name: 'Other expenses', type: 'expense' },
            { name: 'Entertainment', type: 'expense' },
        ];
        await Category.insertMany(categories);
        console.log('Categories initialized');
    } else {
        console.log('Categories already exist');
    }
};
