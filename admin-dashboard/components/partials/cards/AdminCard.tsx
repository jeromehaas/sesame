import React from 'react';
import defaultStyles from '../../../styles/cardWrapper.module.scss';
import userStyles from '../../../styles/UserCard.module.scss';
import { Admin } from '../../../redux/types';

interface Props {
  admin: Admin
  options: any
}

const AdminCard: React.FunctionComponent<Props> = ({
  admin,
  options,
}) => (

  <div className={defaultStyles.cardWrapper}>
    <div className={defaultStyles.infoWrapper}>
      <img className={defaultStyles.image} src="/media/icons/cardOptions/avatar.svg" alt="avatar" />
      <p className={userStyles.firstname}>{admin.firstName}</p>
      <p className={userStyles.lastname}>{admin.lastName}</p>
    </div>
    <div className={defaultStyles.actionsWrapper}>
      <img className={defaultStyles.action} src="/media/icons/cardOptions/edit.svg" alt="edit" onClick={(event) => options.update(event, admin)} />
    </div>
  </div>
);
export default AdminCard;
