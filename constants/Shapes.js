import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const mealShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
});

export const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});
