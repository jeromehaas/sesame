import { getGroups, postGroup, putGroup } from '../../pages/api/hello';

const fetchGroups = () => (dispatch) => {
  getGroups()
    .then((data) => {
      dispatch({ type: 'GET_GROUPS', payload: data });
    });
};

const createGroup = (groupObj) => (dispatch) => {
  postGroup(groupObj)
    .then((data) => {
      dispatch({ type: 'POST_GROUP', payload: data });
    });
};

const updateGroup = (gid, groupObj) => (dispatch) => {
  putGroup(gid, groupObj)
    .then((data) => {
      dispatch({ type: 'UPDATE_GROUP', payload: data });
    });
};

const chooseGroup = (groupObj) => ({ type: 'CHOOSE_GROUP', payload: groupObj });

export {
  fetchGroups, createGroup, updateGroup, chooseGroup,
};
