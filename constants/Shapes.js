import PropTypes from 'prop-types';

export const mealShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
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

export const tagShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
});

export const tagListWithMetadataShape = PropTypes.shape({
  value: PropTypes.arrayOf(tagShape),
  loading: PropTypes.bool,
  exception: PropTypes.object,
});

export const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const userDetailsShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
});

export const userDetailsWithMetaDataShape = PropTypes.shape({
  value: userDetailsShape.isRequired,
  loading: PropTypes.bool,
  exception: PropTypes.object,
});
