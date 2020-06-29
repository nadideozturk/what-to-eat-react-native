import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';
import * as ImageUtils from '../utils/ImageUtils';

const fetchOutsideMealListStart = () => ({
  type: actionTypes.FETCH_OUTSIDE_MEAL_LIST_START,
});

const fetchOutsideMealListSuccess = response => ({
  type: actionTypes.FETCH_OUTSIDE_MEAL_LIST_SUCCESS,
  response,
});

const fetchOutsideMealListFail = exception => ({
  type: actionTypes.FETCH_OUTSIDE_MEAL_LIST_FAIL,
  exception,
});

export const fetchOutsideMealList = async dispatch => {
  dispatch(fetchOutsideMealListStart());

  axios
    .get(
      getUrl('/outsidemeals'),
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

const createOutsideMealStart = () => ({
  type: actionTypes.CREATE_OUTSIDE_MEAL_START,
});

const createOutsideMealSuccess = response => ({
  type: actionTypes.CREATE_OUTSIDE_MEAL_SUCCESS,
  response,
});

const createOutsideMealFail = exception => ({
  type: actionTypes.CREATE_OUTSIDE_MEAL_FAIL,
  exception,
});

export const createOutsideMeal = async ({
  dispatch,
  imageFile,
  meal,
  successHandler,
}) => {
  dispatch(createOutsideMealStart());

  const resizedImage = await ImageUtils.downsize(imageFile);
  const mealWithPhotoContent = {
    ...meal,
    photoContent: resizedImage.base64,
  };
  try {
    const response = axios.post(
      getUrl('/outsidemeals'),
      mealWithPhotoContent,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    );
    successHandler();
    dispatch(createOutsideMealSuccess(response));
  } catch (e) {
    dispatch(createOutsideMealFail(e));
  }
};

const deleteOutsideMealStart = () => ({
  type: actionTypes.DELETE_OUTSIDE_MEAL_START,
});

const deleteOutsideMealSuccess = response => ({
  type: actionTypes.DELETE_OUTSIDE_MEAL_SUCCESS,
  response,
});

const deleteOutsideMealFail = exception => ({
  type: actionTypes.DELETE_OUTSIDE_MEAL_FAIL,
  exception,
});

export const deleteOutsideMeal = async ({
  dispatch,
  mealId,
  successHandler,
}) => {
  dispatch(deleteOutsideMealStart());

  axios
    .delete(
      getUrl(`/outsidemeals/${mealId}`),
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
    .then(response => {
      dispatch(deleteOutsideMealSuccess(response));
      successHandler();
    })
    .catch(error => dispatch(deleteOutsideMealFail(error)));
};

const updateOutsideMealStart = () => ({
  type: actionTypes.UPDATE_OUTSIDE_MEAL_START,
});

// const updateOutsideMealSuccess = (response) => ({
//   type: actionTypes.UPDATE_OUTSIDE_MEAL_SUCCESS,
//   response,
// });

const updateOutsideMealFail = exception => ({
  type: actionTypes.UPDATE_OUTSIDE_MEAL_FAIL,
  exception,
});

export const setCurrentOutsideMeal = meal => ({
  type: actionTypes.SET_CURRENT_OUTSIDE_MEAL,
  meal,
});

export const updateOutsideMeal = async ({
  dispatch,
  imageFile,
  meal,
  successHandler,
}) => {
  dispatch(updateOutsideMealStart());

  let { photoContent } = meal;
  if (imageFile) {
    // a new image is selected, needs to be uploaded to image server
    const resizedImage = await ImageUtils.downsize(imageFile);
    photoContent = resizedImage.base64;
  }
  const mealWithPhotoContent = {
    ...meal,
    photoContent,
  };
  try {
    const response = await axios.put(
      getUrl('/outsidemeals'),
      mealWithPhotoContent,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    );

    // Backend determines what is the newest photo URL
    mealWithPhotoContent.photoUrl = response.data.photoUrl;

    dispatch(setCurrentOutsideMeal(mealWithPhotoContent));
    successHandler();
  } catch (e) {
    console.log(e);
    dispatch(updateOutsideMealFail(e));
  }
};
