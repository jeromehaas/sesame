import { Reducer } from 'react';
import { Action, Doors } from '../types';

let initialState: Doors = { doors: [] };
const doorReducer:Reducer<Doors, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DOORS': initialState = { doors: action.payload };
      return initialState;
    case 'POST_DOORS': initialState = { doors: [...state.doors, action.payload] };
      return initialState;
    default: return state;
  }
};
export default doorReducer;
