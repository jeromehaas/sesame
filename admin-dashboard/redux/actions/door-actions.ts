import { getDoors, postDoor } from '../../pages/api/hello';

const fetchDoors = () => (dispatch) => {
  getDoors()
    .then((data) => dispatch({ type: 'GET_DOORS', payload: data }));
};

const createDoor = (doorObj) => (dispatch) => {
  postDoor(doorObj)
    .then((data) => dispatch({ type: 'POST_DOOR', payload: data }));
};

export { fetchDoors, createDoor };
