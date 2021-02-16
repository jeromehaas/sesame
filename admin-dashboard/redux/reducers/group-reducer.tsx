import { Reducer } from 'redux';
import { Action, Groups } from '../types';

let initialState: Groups = { groups: [] };

const groupReducer: Reducer <Groups, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GROUPS': initialState = { groups: action.payload };
      return initialState;
    case 'POST_GROUP': initialState = { groups: [...state.groups, action.payload] };
      return initialState;
    case 'UPDATE_GROUP': initialState = { groups: [...state.groups.filter((group) => (group.gid !== action.payload.gid)), action.payload] };
      return initialState;
    default: return initialState;
  }
};
export default groupReducer;
