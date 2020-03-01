import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';

const fetchTagsStart = () => ({
  type: actionTypes.FETCH_TAGS_START,
});

const fetchTagsSuccess = response => ({
  type: actionTypes.FETCH_TAGS_SUCCESS,
  response,
});

const fetchTagsFail = exception => ({
  type: actionTypes.FETCH_TAGS_FAIL,
  exception,
});

// eslint-disable-next-line import/prefer-default-export
export const fetchTags = async dispatch => {
  dispatch(fetchTagsStart());

  axios
    .get(
      getUrl('/tags'),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(fetchTagsSuccess(response));
    })
    .catch(error => {
      dispatch(fetchTagsFail(error));
    });
};
