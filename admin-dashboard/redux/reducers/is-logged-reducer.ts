import { Reducer } from 'react';
import { Logged, Action } from '../types';

let originalState: Logged = { logged: false };

const loginReducer: Reducer<Logged, Action> = (state = originalState, action: Action) => {
  switch (action.type) {
    case 'LOGIN': originalState = { logged: true };
      return originalState;
    case 'LOGOUT': originalState = { logged: false };
      return originalState;
    default: return state;
  }
};
export default loginReducer;
