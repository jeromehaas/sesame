import React, { ReactNode } from 'react';
import DefaultDesktopNav from '../navigation/DefaultDesktopNav';
import styles from '../../../styles/DefaultLayout.module.scss';

interface Props {
  children: ReactNode
}

const DefaultLayout: React.FunctionComponent<Props> = ({ children }) => (
  <div>
    <DefaultDesktopNav />
    <div id={styles.wrapper}>
      {children}
    </div>
  </div>

);

export default DefaultLayout;
