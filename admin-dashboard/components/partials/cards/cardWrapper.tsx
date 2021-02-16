import React, { ReactNode } from 'react';
import styles from '../../../styles/CardWrapper.module.scss';

interface Props {
  children: ReactNode
}

const cardWrapper: React.FunctionComponent<Props> = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);

export default cardWrapper;
