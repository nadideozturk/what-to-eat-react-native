// eslint-disable-next-line import/prefer-default-export
export const filterMealsByName = (meals, searchQuery) => {
  if (!searchQuery) {
    return meals;
  }
  return meals.filter(meal => meal.name.toLowerCase().includes(searchQuery.toLowerCase()));
};
