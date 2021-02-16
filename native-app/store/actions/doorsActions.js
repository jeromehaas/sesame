import * as actionTypes from './actionTypes';
import { getDoors } from '../../services/doorAPI';

/**
 * Fetch doors calling the API and set the state equal to the fetched doors.
 */
export const fetchDoors = () => {
  return (dispatch) => {
    getDoors()
      .then((doors) => {
        dispatch({ type: actionTypes.SET_DOORS, payload: doors });
      })
      .catch((err) => console.log('err :>> ', err));
  };
};

/**
 * Return the action for setting the selected door in the state.
 *
 * @param {Object} door, object representing the selected door.
 */
export const setSelectedDoor = (door) => {
  return { type: actionTypes.SET_SELECTED_DOOR, payload: door };
};
