import React from 'react';
import styles from '../../../styles/Dialog.module.scss';

interface Props {
  active:boolean
 }

const Dialog: React.FunctionComponent<Props> = ({ children, active }) => (
  <div id={styles.dialog} className={active === true ? styles.active : ''}>
    {children}
  </div>
);

export default Dialog;
