import { getLogs } from '../../pages/api/hello';

const fetchLogs = () => (dispatch) => {
  getLogs()
    .then((data) => dispatch({ type: 'GET_LOGS', payload: data }));
};

export default fetchLogs;
