import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import defaultStyles from '../../../styles/CardWrapper.module.scss';
import userStyles from '../../../styles/UserCard.module.scss';
import { User } from '../../../redux/types';

interface Props {
  user: User
  options: any
}

const UserCard: React.FunctionComponent<Props> = ({
  user,
  options,
}) => {
  const groups = useSelector((state) => state.groupReducer.groups);
  return (
    <div className={defaultStyles.cardWrapper}>
      <div className={defaultStyles.infoWrapper}>
        <img className={defaultStyles.image} src="/media/icons/cardOptions/avatar.svg" alt="avatar" />
        <p className={userStyles.firstname}>{user.firstName}</p>
        <p className={userStyles.lastname}>{user.lastName}</p>
        <p className={userStyles.email}>{user.email}</p>
        <p className={userStyles.group}>
          {groups.find((group) => group.gid === user.group.gid).groupName}
        </p>
      </div>
      <div className={defaultStyles.actionsWrapper}>
        {user.isActive
          ? <img className={defaultStyles.action} src="/media/icons/cardOptions/active.svg" alt="active" />
          : <img className={defaultStyles.action} src="/media/icons/cardOptions/inactive.svg" alt="inactive" />}
        <img className={defaultStyles.action} src="/media/icons/cardOptions/edit.svg" onClick={(event) => options.update(event, user)} alt="edit" />
      </div>
    </div>
  );
};

export default UserCard;
