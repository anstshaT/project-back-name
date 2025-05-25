import { Category } from '../../db/models/Categories.js';

export const getCategoriesService = async () => {
  const categories = await Category.find({});

  const result = {
    incomes: [],
    expenses: [],
  };

  for (const category of categories) {
    const categoryData = {
      id: category._id,
      name: category.name,
    };

    if (category.type === 'income') {
      result.incomes.push(categoryData);
    } else if (category.type === 'expense') {
      result.expenses.push(categoryData);
    }
  }

  return result;
};
