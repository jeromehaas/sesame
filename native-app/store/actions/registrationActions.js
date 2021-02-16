import * as actions from '../actions/actionTypes';
import { registerUser, checkRegistrationCode } from '../../services/userAPI';
import base64ToArrayBuffer from 'base64-arraybuffer';

export const setCurrentImage = (img) => {
  return { type: actions.SET_CURRENT_IMAGE_REGISTRATION, payload: img };
};

export const addImage = (img) => {
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  return (dispatch) => {
    dispatch({ type: actions.ADD_CURRENT_USER_IMAGE, payload: octetStream });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const registerCurrentUser = (user, img) => {
  const id = user.aid;
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  const images = [...user.images, octetStream];
  return (dispatch) => {
    Promise.all(
      images.map((image) => {
        return registerUser(id, image);
      }),
    )
      .then((responses) => {
        dispatch({
          type: actions.REGISTRATION_SUCCESS,
          payload: responses[0],
        });
      })
      .catch((err) =>
        dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
      );
  };
};

export const setCurrentUser = (code) => {
  return (dispatch) => {
    checkRegistrationCode(code)
      .then((data) => {
        dispatch({ type: actions.SET_CURRENT_USER, payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actions.SET_CURRENT_USER_ERROR });
      });
  };
};

export const clearCurrentUser = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const clearCurrentUserImages = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER_IMAGES });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const resetRegistration = () => {
  return { type: actions.REGISTRATION_RESET };
};
