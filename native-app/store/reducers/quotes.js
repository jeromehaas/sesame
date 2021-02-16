import * as actionTypes from '../actions/actionTypes';
const initialQuotes = [];

export default (state = initialQuotes, action) => {
  switch (action.type) {
    case actionTypes.SET_QUOTES:
    case actionTypes.ADD_QUOTE:
    case actionTypes.REMOVE_QUOTE:
      return action.payload;
    default:
      return state;
  }
};
