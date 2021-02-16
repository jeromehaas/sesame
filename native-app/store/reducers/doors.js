import * as actionTypes from '../actions/actionTypes';
const initialDoors = [];

export const doorsReducer = (state = initialDoors, action) => {
  switch (action.type) {
    case actionTypes.SET_DOORS:
      return action.payload;
    case actionTypes.SET_DOORS_FAIL:
      return state;
    default:
      return state;
  }
};

const initialSelectedDoor = {};
export const selectedDoorReducer = (state = initialSelectedDoor, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_DOOR:
      return action.payload;
    default:
      return state;
  }
};
