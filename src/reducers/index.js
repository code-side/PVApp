import { combineReducers } from 'redux';
import DbReducer from './DbReducer';
import AppReducer from './AppReducer';

export default combineReducers({
  db: DbReducer,
  appConfigReducer: AppReducer
});
