import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';
import * as CloudinaryWrapper from '../utils/CloudinaryWrapper';
import * as ImageUtils from '../utils/ImageUtils';

const fetchHomemadeMealListStart = () => ({
  type: actionTypes.FETCH_HOMEMADE_MEAL_LIST_START,
});

const fetchHomemadeMealListSuccess = response => ({
  type: actionTypes.FETCH_HOMEMADE_MEAL_LIST_SUCCESS,
  response,
});

const fetchHomemadeMealListFail = exception => ({
  type: actionTypes.FETCH_HOMEMADE_MEAL_LIST_FAIL,
  exception,
});

export const fetchHomemadeMealList = async dispatch => {
  dispatch(fetchHomemadeMealListStart());

  axios
    .get(
      getUrl('/homemademeals'),
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

const createHomemadeMealStart = () => ({
  type: actionTypes.CREATE_HOMEMADE_MEAL_START,
});

const createHomemadeMealSuccess = response => ({
  type: actionTypes.CREATE_HOMEMADE_MEAL_SUCCESS,
  response,
});

const createHomemadeMealFail = exception => ({
  type: actionTypes.CREATE_HOMEMADE_MEAL_FAIL,
  exception,
});

export const createHomemadeMeal = async ({
  dispatch,
  imageFile,
  meal,
  successHandler,
}) => {
  dispatch(createHomemadeMealStart());

  const resizedImage = await ImageUtils.downsize(imageFile);
  CloudinaryWrapper.uploadFile(resizedImage)
    .then(xhrResponse => JSON.parse(xhrResponse.target.response).secure_url)
    .then(async photoUrl => {
      const mealWithPhotoUrl = {
        ...meal,
        photoUrl,
      };
      return axios.post(
        getUrl('/homemademeals'),
        mealWithPhotoUrl,
        {
          headers: {
            Authorization: await AsyncStorage.getItem('idToken'),
          },
        },
      );
    })
    .then(response => {
      successHandler();
      dispatch(createHomemadeMealSuccess(response));
    })
    .catch(error => {
      dispatch(createHomemadeMealFail(error));
      // TODO handle failures alert(`upload failed, ${error}`);
    });
};

const deleteHomemadeMealStart = () => ({
  type: actionTypes.DELETE_HOMEMADE_MEAL_START,
});

const deleteHomemadeMealSuccess = response => ({
  type: actionTypes.DELETE_HOMEMADE_MEAL_SUCCESS,
  response,
});

const deleteHomemadeMealFail = exception => ({
  type: actionTypes.DELETE_HOMEMADE_MEAL_FAIL,
  exception,
});

export const deleteHomemadeMeal = async ({
  dispatch,
  mealId,
  successHandler,
}) => {
  dispatch(deleteHomemadeMealStart());

  axios
    .delete(
      getUrl(`/homemademeals/${mealId}`),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(deleteHomemadeMealSuccess(response));
      successHandler();
    })
    .catch(error => dispatch(deleteHomemadeMealFail(error)));
};

const updateHomemadeMealStart = () => ({
  type: actionTypes.UPDATE_HOMEMADE_MEAL_START,
});

// const updateHomemadeMealSuccess = (response) => ({
//   type: actionTypes.UPDATE_HOMEMADE_MEAL_SUCCESS,
//   response,
// });

const updateHomemadeMealFail = exception => ({
  type: actionTypes.UPDATE_HOMEMADE_MEAL_FAIL,
  exception,
});

export const setCurrentHomemadeMeal = meal => ({
  type: actionTypes.SET_CURRENT_HOMEMADE_MEAL,
  meal,
});

export const updateHomemadeMeal = async ({
  dispatch,
  imageFile,
  meal,
  successHandler,
}) => {
  dispatch(updateHomemadeMealStart());

  let { photoUrl } = meal;
  if (imageFile) {
    // a new image is selected, needs to be uploaded to image server
    const resizedImage = await ImageUtils.downsize(imageFile);
    const xhrResponse = await CloudinaryWrapper.uploadFile(resizedImage);
    photoUrl = JSON.parse(xhrResponse.target.response).secure_url;
  }
  const mealWithPhotoUrl = {
    ...meal,
    photoUrl,
  };
  axios
    .put(
      getUrl('/homemademeals'),
      mealWithPhotoUrl,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(() => {
      dispatch(setCurrentHomemadeMeal(mealWithPhotoUrl));
      successHandler();
      // dispatch(updateHomemadeMealSuccess(response)); backend is not sending
      // updated meal
    })
    .catch(error => {
      dispatch(updateHomemadeMealFail(error));
      // TODO handle failures alert(`upload failed, ${error}`);
    });
};
