import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';

const fetchHomemadeMealListStart = () => ({
  type: actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_START,
});

const fetchHomemadeMealListSuccess = response => ({
  type: actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_SUCCESS,
  response,
});

const fetchHomemadeMealListFail = exception => ({
  type: actionTypes.EXPLORE_FETCH_HOMEMADE_MEAL_LIST_FAIL,
  exception,
});

export const fetchHomemadeMealList = async dispatch => {
  dispatch(fetchHomemadeMealListStart());

  axios
    .get(
      getUrl('/explore/homemade'),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(fetchHomemadeMealListSuccess(response));
    })
    .catch(error => {
      dispatch(fetchHomemadeMealListFail(error));
    });
};

const fetchOutsideMealListStart = () => ({
  type: actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_START,
});

const fetchOutsideMealListSuccess = response => ({
  type: actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_SUCCESS,
  response,
});

const fetchOutsideMealListFail = exception => ({
  type: actionTypes.EXPLORE_FETCH_OUTSIDE_MEAL_LIST_FAIL,
  exception,
});

export const fetchOutsideMealList = async dispatch => {
  dispatch(fetchOutsideMealListStart());

  axios
    .get(
      getUrl('/explore/outside'),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(fetchOutsideMealListSuccess(response));
    })
    .catch(error => {
      dispatch(fetchOutsideMealListFail(error));
    });
};
