import React from 'react';
import defaultStyles from '../../../styles/CardWrapper.module.scss';
import groupStyles from '../../../styles/GroupCard.module.scss';
import { Group } from '../../../redux/types';

interface Props {
  groupName: string,
  group: Group,
  options: any
}

const GroupCard: React.FunctionComponent<Props> = ({
  groupName,
  group,
  options,
}) => (
  <div className={defaultStyles.cardWrapper}>
    <div className={defaultStyles.infoWrapper}>
      <img className={defaultStyles.image} src="/media/icons/cardOptions/avatar.svg" alt="avatar" />
      <p className={groupStyles.groupName}>{groupName}</p>
    </div>
    <div className={defaultStyles.actionsWrapper}>
      <img className={defaultStyles.action} onClick={(event) => options.update(event, group)} src="/media/icons/cardOptions/edit.svg" alt="edit" />
    </div>
  </div>
);

export default GroupCard;
