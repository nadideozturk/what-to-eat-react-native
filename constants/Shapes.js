import PropTypes from 'prop-types';

export const mealShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
});

export const homemadeMealShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  // TODO what else
});

export const homemadeMealListWithMetadataShape = PropTypes.shape({
  value: PropTypes.arrayOf(homemadeMealShape),
  loading: PropTypes.bool,
  exception: PropTypes.object,
});

export const homemadeMealWithMetadataShape = PropTypes.shape({
  value: homemadeMealShape,
  loading: PropTypes.bool,
  exception: PropTypes.object,
});

export const outsideMealShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  // TODO what else
});

export const outsideMealWithMetadataShape = PropTypes.shape({
  value: outsideMealShape,
  loading: PropTypes.bool,
  exception: PropTypes.object,
});

export const outsideMealListWithMetadataShape = PropTypes.shape({
  value: PropTypes.arrayOf(outsideMealShape),
  loading: PropTypes.bool,
  exception: PropTypes.object,
});

export const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});
