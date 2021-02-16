import React from 'react';
import Styles from '../../../styles/InfoCard.module.scss';

interface Props {
    number:number,
    text: string
}

const InfoCard: React.FunctionComponent<Props> = ({ number, text }) => (
  <div className={Styles.cardWrapper}>
    <div className={Styles.heading}>
      {text}
    </div>
    <div className={Styles.number}>
      {number}
    </div>
  </div>
);

export default InfoCard;
