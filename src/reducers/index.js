import { combineReducers } from 'redux';
import DbReducer from './DbReducer';
import ProvinceReducer from './ProvinceReducer';
import AppReducer from './AppReducer';

export default combineReducers({
  db: DbReducer,
  provinceReducer: ProvinceReducer,
  appConfigReducer: AppReducer
});
