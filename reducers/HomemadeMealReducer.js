import * as actionTypes from '../constants/ActionTypes';
import { error } from '../utils/ErrorHandler';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE_HOMEMADE_MEAL_START:
      return state;
    case actionTypes.CREATE_HOMEMADE_MEAL_SUCCESS:
      return state;
    case actionTypes.CREATE_HOMEMADE_MEAL_FAIL:
      error('Failed to create homemade meal');
      return state;
    case actionTypes.SET_CURRENT_HOMEMADE_MEAL:
      return {
        value: action.meal,
      };
    case actionTypes.DELETE_HOMEMADE_MEAL_START:
      return state;
    case actionTypes.DELETE_HOMEMADE_MEAL_SUCCESS:
      return state;
    case actionTypes.DELETE_HOMEMADE_MEAL_FAIL:
      error('Failed to delete homemade meal');
      return state;
    default:
      return state;
  }
}
