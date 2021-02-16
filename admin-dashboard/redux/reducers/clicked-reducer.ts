import { Reducer } from 'react';
import { Clicked, Action } from '../types';

let originalState: Clicked = { clicked: 'OVERVIEW' };

const clickedReducer: Reducer<Clicked, Action> = (state = originalState, action: Action) => {
  switch (action.type) {
    case 'OVERVIEW': originalState = { clicked: 'OVERVIEW' };
      return originalState;
    case 'DOORS': originalState = { clicked: 'DOORS' };
      return originalState;
    case 'GROUPS': originalState = { clicked: 'GROUPS' };
      return originalState;
    case 'LOGS': originalState = { clicked: 'LOGS' };
      return originalState;
    case 'ISSUES': originalState = { clicked: 'ISSUES' };
      return originalState;
    case 'SETTINGS': originalState = { clicked: 'SETTINGS' };
      return originalState;
    case 'USERS': originalState = { clicked: 'USERS' };
      return originalState;
    default: return state;
  }
};
export default clickedReducer;
