import { SERVER_IP, PORT } from '@env';
import { sendRequest } from './sendRequest.js';

const apiUrl = `${SERVER_IP}:${PORT}/azure`;

export const checkUserCode = (doorId, code) => {
  return sendRequest(`${apiUrl}/code/${doorId}/${code}`, {
    method: 'GET',
  });
};

export const checkUserFace = (doorId, faceId) => {
  return sendRequest(`${apiUrl}/identify/${doorId}/${faceId}`, {
    method: 'GET',
  });
};

export const checkRegistrationCode = (code) => {
  return sendRequest(`${apiUrl}/register/${code}`, {
    method: 'GET',
  });
};

export const registerUser = (id, img) => {
  return sendRequest(`${apiUrl}/register/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: img,
  });
};
