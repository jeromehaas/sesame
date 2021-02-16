import { Reducer } from 'redux';
import { Action, Logs } from '../types';

let originalState: Logs = { logs: [] };
const logsReducer : Reducer<Logs, Action> = (state = originalState, action) => {
  switch (action.type) {
    case 'GET_LOGS': originalState = { logs: action.payload };
      return originalState;
    default: return state;
  }
};
export default logsReducer;
