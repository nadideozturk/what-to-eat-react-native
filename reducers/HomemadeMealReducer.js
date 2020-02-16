import * as actionTypes from '../constants/ActionTypes';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE_HOMEMADE_MEAL_START:
      return state;
    case actionTypes.CREATE_HOMEMADE_MEAL_SUCCESS:
      return state;
    case actionTypes.CREATE_HOMEMADE_MEAL_FAIL:
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
      return state;
    default:
      return state;
  }
}
