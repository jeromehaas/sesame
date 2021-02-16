import React from 'react';
import defaultStyles from '../../../styles/cardWrapper.module.scss';
import doorStyles from '../../../styles/UserCard.module.scss';

interface Props {
  doorName: string;
}

const UserCard: React.FunctionComponent<Props> = ({
  doorName,
}) => (
  <div className={defaultStyles.cardWrapper}>
    <div className={defaultStyles.infoWrapper}>
      <img className={defaultStyles.image} src="/media/icons/cardOptions/key.svg" alt="key" />
      <p className={doorStyles.doorName}>{doorName}</p>
    </div>

  </div>
);

export default UserCard;
