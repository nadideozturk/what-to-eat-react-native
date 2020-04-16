import * as actionTypes from '../constants/ActionTypes';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_START:
      return {
        loading: true,
      };
    case actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_SUCCESS:
      return {
        loading: false,
        value: action.response.data,
      };
    case actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_FAIL:
      return {
        loading: false,
        exception: action.exception,
      };
    default:
      return state;
  }
}
