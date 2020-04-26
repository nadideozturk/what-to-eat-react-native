import * as actionTypes from '../constants/ActionTypes';
import { error } from '../utils/ErrorHandler';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERDETAILS_START:
    case actionTypes.SET_USER_PREFERECES_START:
      return {
        loading: true,
      };
    case actionTypes.FETCH_USERDETAILS_SUCCESS:
    case actionTypes.SET_USER_PREFERECES_SUCCESS:
      return {
        loading: false,
        value: action.response.data,
      };
    case actionTypes.FETCH_USERDETAILS_FAIL:
      error('Failed to retrieve user preferences');
      return {
        loading: false,
        exception: action.exception,
      };
    case actionTypes.SET_USER_PREFERECES_FAIL:
      error('Failed to change user preferences');
      return {
        loading: false,
        exception: action.exception,
      };
    default:
      return state;
  }
}
