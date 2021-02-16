/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import DashboardLayout from '../../components/partials/layouts/DashboardLayout';
import CardWrapper from '../../components/partials/cards/cardWrapper';
import LogCard from '../../components/partials/cards/LogCard';
import InfoCard from '../../components/partials/cards/InfoCard';
import styles from '../../styles/Overview.module.scss';
import { fetchUsers } from '../../redux/actions/user-actions';
import { fetchGroups } from '../../redux/actions/group-actions';
import { fetchDoors } from '../../redux/actions/door-actions';
import fetchLogs from '../../redux/actions/log-actions';
import { fetchIssues } from '../../redux/actions/issue-actions';
import { Log } from '../../redux/types';

interface Props { }

const Overview: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.userReducer.users);
  const logs = useSelector((store) => store.logsReducer.logs);
  const doors = useSelector((store) => store.doorReducer.doors);
  const issues = useSelector((store) => store.issueReducer.issues);
  const filteredIssues = issues.filter((issue) => (issue.active ? issue : null));
  const activeUsers = users.filter((user) => user.isActive);

  useEffect(() => {
    dispatch(fetchDoors());
    dispatch(fetchGroups());
    dispatch(fetchUsers());
    dispatch(fetchLogs());
    dispatch(fetchIssues());
  }, []);

  const getGraphData = (logsForGraphData) => {
    const today = new Date();
    let currentHour: any = today.getHours();
    if (currentHour < 10) {
      currentHour = `0${currentHour}`;
    }

    const logsFromToday: Log[] = logsForGraphData.filter((log) => (
      new Date(log.date).getDate() === today.getDate()
      && new Date(log.date).getMonth() === today.getMonth()
      && new Date(log.date).getFullYear() === today.getFullYear()));

    const logsBeforeOneHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour);
    const logsBeforeTwoHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour - 1);
    const logsBeforeThreeHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour - 2);
    const logsBeforeFourHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour - 3);
    const logsBeforeFiveHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour - 4);
    const logsBeforeSixHour = logsFromToday.filter((log) => new Date(log.date).getHours() === currentHour - 5);

    return {
      currentHour,
      hours: {
        logsBeforeOneHour,
        logsBeforeTwoHour,
        logsBeforeThreeHour,
        logsBeforeFourHour,
        logsBeforeFiveHour,
        logsBeforeSixHour,
      },
    };
  };

  const graphData = getGraphData(logs);

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
  };

  const data = {

    labels: [
      graphData.currentHour - 5,
      graphData.currentHour - 4,
      graphData.currentHour - 3,
      graphData.currentHour - 2,
      graphData.currentHour - 1,
      graphData.currentHour],

    datasets: [
      {
        data: [graphData.hours.logsBeforeSixHour.length, graphData.hours.logsBeforeFiveHour.length, graphData.hours.logsBeforeFourHour.length, graphData.hours.logsBeforeThreeHour.length, graphData.hours.logsBeforeTwoHour.length, graphData.hours.logsBeforeOneHour.length],
        label: 'Recent Entries',
        fill: false,
        startAtZero: true,
        lineTension: 0.2,
        backgroundColor: '#ffffff',
        borderColor: '#B00E23',
        borderCapStyle: 'butt',
        borderDash: [],
        animation: true,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#B00E23',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#B00E23',
        pointHoverBorderColor: '#B00E23',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        scaleLabel: {
          fontColor: '#B00E23',
          labelString: 'hello world',

        },

      },

    ],
  };

  return (
    <>
      { users && users.length && doors && doors.length && logs && logs.length && (
        <DashboardLayout>

          <div>
            <div className={styles.cardBox}>
              <InfoCard number={activeUsers.length} text="active users" />
              <InfoCard number={users.length - activeUsers.length} text="open invitations" />
              <InfoCard number={logs.length} text="daily openings" />
              <InfoCard number={filteredIssues.length} text="open issues" />
              {' '}
            </div>
            <CardWrapper>
              <div className={styles.chartWrapper}>
                <Line data={data} options={options} />
              </div>
            </CardWrapper>

            <CardWrapper>
              {logs.map((log) => (
                <LogCard
                  key={log._id}
                  firstname={users.find(({ aid }) => aid === log.enteredBy).firstName}
                  lastname={users.find(({ aid }) => aid === log.enteredBy).lastName}
                  doorName={doors.find(({ did }) => did === log.enteredDoor).doorName}
                  createdOn={moment(log.date).format('MMM Do YY')}
                />
              ))}
            </CardWrapper>
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default Overview;
