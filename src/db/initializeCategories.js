import { Category } from "./models/Categories.js";

const requiredCategories = [
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

export const initializeCategories = async () => {
    const existing = await Category.find({});
    const existingNames = existing.map(c => c.name.toLowerCase());

    const missing = requiredCategories.filter(
        (cat) => !existingNames.includes(cat.name.toLowerCase())
    );

    if (missing.length > 0) {
    await Category.insertMany(missing);
    console.log(`Added ${missing.length} missing categories.`);
} else {
    console.log('All required categories are already present.');
}
};


// export const initializeCategories = async () => {
//     const existing = await Category.find({});
//     if (existing.length === 0) {
//         const categories = [
//             { name: 'Incomes', type: 'income' },
//             { name: 'Main expenses', type: 'expense' },
//             { name: 'Products', type: 'expense' },
//             { name: 'Car', type: 'expense' },
//             { name: 'Self care', type: 'expense' },
//             { name: 'Child care', type: 'expense' },
//             { name: 'Household products', type: 'expense' },
//             { name: 'Education', type: 'expense' },
//             { name: 'Leisure', type: 'expense' },
//             { name: 'Other expenses', type: 'expense' },
//             { name: 'Entertainment', type: 'expense' },
//         ];
//         await Category.insertMany(categories);
//         console.log('Categories initialized');
//     } else {
//         console.log('Categories already exist');
//     }
// };
