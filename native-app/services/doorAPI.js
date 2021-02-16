import { SERVER_IP, PORT } from '@env';
import { sendRequest } from './sendRequest.js';

const apiUrl = `${SERVER_IP}:${PORT}/door/list`;

export const getDoors = () => {
  return sendRequest(apiUrl, {
    method: 'GET',
  });
};
