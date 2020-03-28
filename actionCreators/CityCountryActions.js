import axios from 'axios';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';

const fetchCityCountryListStart = () => ({
  type: actionTypes.FETCH_CITY_COUNTRY_LIST_START,
});

const fetchCityCountryListSuccess = response => ({
  type: actionTypes.FETCH_CITY_COUNTRY_LIST_SUCCESS,
  response,
});

const fetchCityCountryListFail = exception => ({
  type: actionTypes.FETCH_CITY_COUNTRY_LIST_FAIL,
  exception,
});

// eslint-disable-next-line import/prefer-default-export
export const fetchCityCountryList = async dispatch => {
  dispatch(fetchCityCountryListStart());

  axios
    .get(getUrl('/citycountry'))
    .then(response => {
      dispatch(fetchCityCountryListSuccess(response));
    })
    .catch(error => {
      dispatch(fetchCityCountryListFail(error));
    });
};
