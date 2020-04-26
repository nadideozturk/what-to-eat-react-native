import * as actionTypes from '../constants/ActionTypes';
import { error } from '../utils/ErrorHandler';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_CITY_COUNTRY_LIST_START:
      return {
        loading: true,
      };
    case actionTypes.FETCH_CITY_COUNTRY_LIST_SUCCESS:
      return {
        loading: false,
        value: action.response.data,
      };
    case actionTypes.FETCH_CITY_COUNTRY_LIST_FAIL:
      error('Failed to retrieve city list');
      return {
        loading: false,
        exception: action.exception,
      };
    default:
      return state;
  }
}
