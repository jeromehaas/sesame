import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../../../styles/DashboardLayout.module.scss';
import DashboardDesktopNav from '../navigation/DashboardDesktopNav';
import { showDialog } from '../../../redux/actions/dialogstatus-actions';

import { activateBlur, deactivateBlur } from '../../../redux/actions/dialogblur-actions';

interface Props {
  children: any
}

const DashboardLayout: React.FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dialogblur = useSelector((state) => state.dialogblurReducer);
  const logged = useSelector((state) => state.loginReducer.logged);
  const href = '/Login';

  useEffect(() => {
    if (!logged) { router.push(href); }
  }, []);

  if (logged) {
    const cancelDialog = (event) => {
      event.preventDefault();
      dispatch(showDialog('RESET'));
      dispatch(deactivateBlur());
    };

    return (
      <>
        <div id={styles.pageWrapper}>
          <div id={styles.dashboard}>
            <DashboardDesktopNav />
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <div onClick={cancelDialog} id={styles.dialogBlur} className={dialogblur.status === 'active' ? styles.active : ''} />
        </div>
      </>
    );
  }
  return null;
};

export default DashboardLayout;
