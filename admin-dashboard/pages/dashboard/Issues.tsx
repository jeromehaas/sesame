import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from '../../components/partials/layouts/DashboardLayout';
import CardWrapper from '../../components/partials/cards/cardWrapper';
import IssueCard from '../../components/partials/cards/IssueCard';
import { activateBlur, deactivateBlur } from '../../redux/actions/dialogblur-actions';
import Dialog from '../../components/partials/dialogs/Dialog';
import TemplateForm from '../../components/partials/inputFields/TemplateForm';
import TemplateInput from '../../components/partials/inputFields/TemplateInput';
import { showDialog } from '../../redux/actions/dialogstatus-actions';

import { deactivateIssue, chooseIssue } from '../../redux/actions/issue-actions';

interface Props { }

const Issues: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const dialogStatus = useSelector((state) => state.dialogStatusReducer);
  const issues = useSelector((store) => store.issueReducer.issues);
  const users = useSelector((store) => store.userReducer.users);
  const filteredIssues = issues.filter((issue) => (issue.active ? issue : null));
  const pickedIssue = useSelector((state) => state.choosenCardReducer.picked);

  const showSolveIssueDialog = (event, issue) => {
    dispatch(chooseIssue(issue));
    dispatch(activateBlur());
    dispatch(showDialog('ISSUES_DIALOG_UPDATE'));
  };
  const cancelDialog = (event) => {
    event.preventDefault();
    dispatch(showDialog('RESET'));
    dispatch(deactivateBlur());
  };
  const handleDeactivate = (event, text) => {
    event.preventDefault();
    dispatch(deactivateIssue(pickedIssue._id));
    cancelDialog(event);
  };

  return (
    <>
      <Dialog active={dialogStatus.issues_update === 'active'}>
        <TemplateForm buttonText="Solve" onSubmitAction={(event) => handleDeactivate(event, 'it is working')}>
          <TemplateInput labelText="" type="question" question="Are you sure?" />
        </TemplateForm>
      </Dialog>
      <DashboardLayout>
        <CardWrapper>
          {filteredIssues.map((issue) => <IssueCard type={issue.type} issue={issue} createdOn={issue.createdOn} reportedBy={users.find(({ aid }) => aid === issue.reportedBy).firstName} options={{ solve: showSolveIssueDialog }} />)}
        </CardWrapper>
      </DashboardLayout>
    </>
  );
};

export default Issues;
