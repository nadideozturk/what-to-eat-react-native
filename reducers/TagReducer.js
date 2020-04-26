import { error } from '../utils/ErrorHandler';
import * as actionTypes from '../constants/ActionTypes';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_TAGS_START:
      return {
        loading: true,
      };
    case actionTypes.FETCH_TAGS_SUCCESS:
      return {
        loading: false,
        value: action.response.data,
      };
    case actionTypes.FETCH_TAGS_FAIL:
      error('Failed to retrieve tags');
      return {
        loading: false,
        exception: action.exception,
      };
    default:
      return state;
  }
}
