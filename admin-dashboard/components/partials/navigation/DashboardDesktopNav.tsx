import React from 'react';
import styles from '../../../styles/DashboardDesktopNav.module.scss';
import NavigationItem from './NavigationItem';
import {
  clickedOnDoors,
  clickedOnGroups,
  clickedOnIssues,
  clickedOnLogs,
  clickedOnOverview,
  clickedOnUsers,
  clickedOnSettings,
} from '../../../redux/actions/clicked-actions';

interface Props { }

const DashboardDesktopNav: React.FunctionComponent<Props> = () => (
  <div className={styles.navbar}>
    <img id={styles.logoPlaceHolder} src="/media/logos/logo.png" alt="sesame" />
    <NavigationItem linkName="Overview" path="/dashboard/Overview" action="OVERVIEW" dispatcher={clickedOnOverview} icon="/media/icons/NavigationIcons/overview.svg" />
    <NavigationItem linkName="Users" path="/dashboard/Users" action="USERS" dispatcher={clickedOnUsers} icon="/media/icons/NavigationIcons/users.svg" />
    <NavigationItem linkName="Groups" path="/dashboard/Groups" action="GROUPS" dispatcher={clickedOnGroups} icon="/media/icons/NavigationIcons/groups.svg" />
    <NavigationItem linkName="Doors" path="/dashboard/Doors" action="DOORS" dispatcher={clickedOnDoors} icon="/media/icons/NavigationIcons/doors.svg" />
    <NavigationItem linkName="Logs" path="/dashboard/Logs" action="LOGS" dispatcher={clickedOnLogs} icon="/media/icons/NavigationIcons/logs.svg" />
    <NavigationItem linkName="Issues" path="/dashboard/Issues" action="ISSUES" dispatcher={clickedOnIssues} icon="/media/icons/NavigationIcons/issues.svg" />
    <NavigationItem linkName="Settings" path="/dashboard/Settings" action="SETTINGS" dispatcher={clickedOnSettings} icon="/media/icons/NavigationIcons/settings.svg" />
    <NavigationItem linkName="Logout" path="/Login" action="LOGOUT" dispatcher={clickedOnOverview} icon="/media/icons/NavigationIcons/cancel.svg" />
  </div>
);
export default DashboardDesktopNav;
