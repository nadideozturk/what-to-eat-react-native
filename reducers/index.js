import { combineReducers } from 'redux';
import HomeadeMealListReducer from './HomemadeMealListReducer';
import HomemadeMealReducer from './HomemadeMealReducer';
import OutsideMealListReducer from './OutsideMealListReducer';
import OutsideMealReducer from './OutsideMealReducer';
import TagReducer from './TagReducer';

export const initialState = {};

export default combineReducers(
  {
    homemadeMealList: HomeadeMealListReducer,
    currentHomemadeMeal: HomemadeMealReducer,
    outsideMealList: OutsideMealListReducer,
    currentOutsideMeal: OutsideMealReducer,
    tags: TagReducer,
  },
);
