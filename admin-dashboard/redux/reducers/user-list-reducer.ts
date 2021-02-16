import { Reducer } from 'react';
import { useSelector } from 'react-redux';
import { Users, Action } from '../types';

let originalState: Users = { users: [] };

const userReducer: Reducer<Users, Action> = (state = originalState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      originalState = { users: action.payload };
      return originalState;
    case 'POST_USER': originalState = { users: [...state.users, action.payload] };
      return originalState;
    case 'UPDATE_USER': originalState = { users: [...state.users.filter((user) => (user.aid !== action.payload.aid)), action.payload.data] };

      return originalState;
    case 'DELETE_USER': originalState = { users: [...state.users.filter((user) => (user.aid !== action.payload.aid), action.payload.data)] };
      return originalState;

    default: return state;
  }
};
export default userReducer;
