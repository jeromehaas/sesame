import { Reducer } from 'redux';
import { Action, Issues } from '../types';

let originalState: Issues = { issues: [] };
const issueReducer : Reducer<Issues, Action> = (state = originalState, action) => {
  switch (action.type) {
    case 'GET_ISSUES': originalState = { issues: action.payload };
      return originalState;
    case 'DEACTIVATE_ISSUE': originalState = { issues: [...state.issues.filter((issue) => issue._id !== action.payload)] };
      return originalState;
    default: return state;
  }
};
export default issueReducer;
