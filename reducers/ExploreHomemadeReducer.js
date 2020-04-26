import * as actionTypes from '../constants/ActionTypes';
import { error } from '../utils/ErrorHandler';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_START:
      return {
        loading: true,
      };
    case actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_SUCCESS:
      return {
        loading: false,
        value: action.response.data,
      };
    case actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_FAIL:
      error('Failed to retrieve explore screen homemade meal list');
      return {
        loading: false,
        exception: action.exception,
      };
    default:
      return state;
  }
}
