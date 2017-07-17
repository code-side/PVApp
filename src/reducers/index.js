import { combineReducers } from 'redux';
import DbReducer from './DbReducer';
import ProvinceReducer from './ProvinceReducer';

export default combineReducers({
  db: DbReducer,
  provinceReducer: ProvinceReducer
});
