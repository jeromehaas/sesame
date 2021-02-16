import { Reducer } from 'react';
import { User, Action } from '../types';

let originalState: any = { picked: {} };

const choosenCardReducer: Reducer<User, Action> = (state = originalState, action: Action) => {
  switch (action.type) {
    case 'CHOOSE_USER': originalState = { picked: action.payload };
      return originalState;
    case 'CHOOSE_GROUP': originalState = { picked: action.payload };
      return originalState;
    case 'CHOOSE_ISSUE': originalState = { picked: action.payload };
      return originalState;
    default: return state;
  }
};
export default choosenCardReducer;
