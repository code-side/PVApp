import { combineReducers } from 'redux';
import DbReducer from './DbReducer';

export default combineReducers({
  db: DbReducer,
});
