import { combineReducers } from 'redux';
import HomeadeMealListReducer from './HomemadeMealListReducer';
import HomemadeMealReducer from './HomemadeMealReducer';
import ExploreHomemadeReducer from './ExploreHomemadeReducer';
import ExploreOutsideReducer from './ExploreOutsideReducer';
import OutsideMealListReducer from './OutsideMealListReducer';
import OutsideMealReducer from './OutsideMealReducer';
import TagReducer from './TagReducer';
import CityCountryReducer from './CityCountryReducer';
import UserDetailsReducer from './UserDetailsReducer';

export const initialState = {};

export default combineReducers(
  {
    homemadeMealList: HomeadeMealListReducer,
    currentHomemadeMeal: HomemadeMealReducer,
    outsideMealList: OutsideMealListReducer,
    currentOutsideMeal: OutsideMealReducer,
    tags: TagReducer,
    cityCountryList: CityCountryReducer,
    userDetails: UserDetailsReducer,
    exploreHomemadeMealList: ExploreHomemadeReducer,
    exploreOutsideMealList: ExploreOutsideReducer,
  },
);
