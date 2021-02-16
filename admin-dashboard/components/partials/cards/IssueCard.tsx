import React from 'react';
import defaultStyles from '../../../styles/cardWrapper.module.scss';
import issueStyles from '../../../styles/IssueCard.module.scss';
import { Issue } from '../../../redux/types';

interface Props {
  type: string,
  createdOn: Date,
  reportedBy: String,
  options: any
  issue: Issue
}

const IssueCard: React.FunctionComponent<Props> = ({
  type,
  createdOn,
  reportedBy,
  options,
  issue,
}) => (
  <div className={defaultStyles.cardWrapper}>
    <div className={defaultStyles.infoWrapper}>
      <img className={defaultStyles.image} src="/media/icons/cardOptions/issue.svg" alt="issue" />
      <p className={issueStyles.type}>{type}</p>
      <p className={issueStyles.createdOn}>{createdOn}</p>
      <p className={issueStyles.reportedBy}>{reportedBy}</p>
    </div>
    <div className={defaultStyles.actionsWrapper}>
      <img className={defaultStyles.action} src="/media/icons/cardOptions/check.svg" alt="check" onClick={(event) => options.solve(event, issue)} />
    </div>
  </div>
);

export default IssueCard;
