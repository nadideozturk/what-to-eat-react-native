import * as actionTypes from '../constants/ActionTypes';
import { error } from '../utils/ErrorHandler';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE_OUTSIDE_MEAL_START:
      return state;
    case actionTypes.CREATE_OUTSIDE_MEAL_SUCCESS:
      return state;
    case actionTypes.CREATE_OUTSIDE_MEAL_FAIL:
      error('Failed to create outside meal');
      return state;
    case actionTypes.SET_CURRENT_OUTSIDE_MEAL:
      return {
        value: action.meal,
      };
    case actionTypes.DELETE_OUTSIDE_MEAL_START:
      return state;
    case actionTypes.DELETE_OUTSIDE_MEAL_SUCCESS:
      return state;
    case actionTypes.DELETE_OUTSIDE_MEAL_FAIL:
      error('Failed to delete outside meal');
      return state;
    default:
      return state;
  }
}
