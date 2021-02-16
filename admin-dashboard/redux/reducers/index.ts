import { combineReducers } from 'redux';
import loginReducer from './is-logged-reducer';
import themeReducer from './theme-reducer';
import clickedReducer from './clicked-reducer';
import userReducer from './user-list-reducer';
import groupReducer from './group-reducer';
import doorReducer from './door-reducer';
import logsReducer from './logs-reducers';
import dialogblurReducer from './dialogblur-reducers';
import dialogStatusReducer from './dialogstatus-reducers';
import choosenCardReducer from './choosen-card-reducer';
import issueReducer from './issue-reducers';

export default combineReducers({
  loginReducer,
  themeReducer,
  clickedReducer,
  userReducer,
  groupReducer,
  doorReducer,
  logsReducer,
  issueReducer,
  dialogblurReducer,
  dialogStatusReducer,
  choosenCardReducer,
});
