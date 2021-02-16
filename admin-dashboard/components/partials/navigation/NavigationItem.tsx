import React from 'react';
import Link from 'next/Link';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../styles/DashboardDesktopNav.module.scss';

interface Props {
  linkName: string,
  path: string,
  action: string,
  icon:string,
  dispatcher: Function

 }

const NavigationItem: React.FunctionComponent<Props> = ({
  linkName, path, action, icon, dispatcher,
}) => {
  const clicked = useSelector((state) => state.clickedReducer.clicked);
  const dispatch = useDispatch();

  return (
    <div className={styles.navlink} aria-hidden="true">
      <Link href={path}>
        <button id={clicked === action ? styles.clicked : null} onClick={() => dispatch(dispatcher())} type="button">
          <img className={styles.navigationIcon} src={icon} alt={linkName} />
          <span>{linkName}</span>
        </button>
      </Link>
    </div>
  );
};

export default NavigationItem;
