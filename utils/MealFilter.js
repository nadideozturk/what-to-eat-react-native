export const filterMealsByName = (meals, searchQuery) => {
  if (!searchQuery) {
    return meals;
  }
  return meals.filter(meal => meal.name.toLowerCase().includes(searchQuery.toLowerCase()));
};

export const filterOutsideMealsByName = (meals, searchQuery) => {
  if (!searchQuery) {
    return meals;
  }
  return meals.filter(meal => meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    || meal.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()));
};
