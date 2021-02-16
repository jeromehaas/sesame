import { getIssues, putIssues } from '../../pages/api/hello';

const fetchIssues = () => (dispatch) => {
  getIssues()
    .then((data) => dispatch({ type: 'GET_ISSUES', payload: data }));
};

const deactivateIssue = (_id) => (dispatch) => {
  putIssues(_id)
    .then((data) => dispatch({ type: 'DEACTIVATE_ISSUE', payload: _id }));
};

const chooseIssue = (issueObj) => ({ type: 'CHOOSE_ISSUE', payload: issueObj });

export { fetchIssues, deactivateIssue, chooseIssue };
