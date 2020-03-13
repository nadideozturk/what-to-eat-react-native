import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';

const fetchUserDetailsStart = () => ({
  type: actionTypes.FETCH_USERDETAILS_START,
});

const fetchUserDetailsSuccess = response => ({
  type: actionTypes.FETCH_USERDETAILS_SUCCESS,
  response,
});

const fetchUserDetailsFail = exception => ({
  type: actionTypes.FETCH_USERDETAILS_FAIL,
  exception,
});

export const fetchUserDetails = async dispatch => {
  dispatch(fetchUserDetailsStart());

  axios
    .get(
      getUrl('/user/details'),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(fetchUserDetailsSuccess(response));
    })
    .catch(error => {
      dispatch(fetchUserDetailsFail(error));
    });
};

const setUserPreferencesStart = () => ({
  type: actionTypes.SET_USER_PREFERECES_START,
});

const setUserPreferencesSuccess = response => ({
  type: actionTypes.SET_USER_PREFERECES_SUCCESS,
  response,
});

const setUserPreferencesFail = exception => ({
  type: actionTypes.SET_USER_PREFERECES_FAIL,
  exception,
});

export const setUserPreferences = async ({
  dispatch,
  user,
}) => {
  dispatch(setUserPreferencesStart());

  axios
    .put(
      getUrl('/user/preferences'),
      user,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(setUserPreferencesSuccess(response));
    })
    .catch(error => {
      dispatch(setUserPreferencesFail(error));
    });
};
