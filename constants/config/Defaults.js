// eslint-disable-next-line
const defaultMealImage = require('../../assets/images/meal-placeholder.png');
export const getMealImageSourceWithDeafult = meal => (
  meal && meal.photoUrl ? { uri: meal.photoUrl } : defaultMealImage
);
export const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};
