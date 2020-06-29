import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/ActionTypes';
import { getUrl } from '../constants/config/BackendConfig';
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
  const mealWithPhotoContent = {
    ...meal,
    photoContent: resizedImage.base64,
  };
  try {
    const response = await axios.post(
      getUrl('/homemademeals'),
      mealWithPhotoContent,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    );
    successHandler();
    dispatch(createHomemadeMealSuccess(response));
  } catch (e) {
    dispatch(createHomemadeMealFail(e));
  }
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
      getUrl('/homemademeals'),
      mealWithPhotoContent,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    );

    // Backend determines what is the newest photo URL
    mealWithPhotoContent.photoUrl = response.data.photoUrl;

    dispatch(setCurrentHomemadeMeal(mealWithPhotoContent));
    successHandler();
  } catch (e) {
    console.log(e);
    dispatch(updateHomemadeMealFail(e));
  }
};
