/* eslint-disable no-use-before-define */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import TemplateInput from '../components/partials/inputFields/TemplateInput';
import LoginForm from '../components/partials/inputFields/LoginForm';

import { logins } from '../redux/actions/login-actions';
import DefaultLayout from '../components/partials/layouts/DefaultLayout';
import styles from '../styles/Login.module.scss';

interface Props { }

const Login: React.FunctionComponent <Props> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const href = './dashboard/Overview';

  function login(event) {
    event.preventDefault();
    dispatch(logins());
    router.push(href);
  }

  return (
    <DefaultLayout>
      <div id={styles.wrapper}>
        <LoginForm onSubmitAction={login} buttonText="Sign In">
          <TemplateInput labelText="Username" type="text" />
          <TemplateInput labelText="Password" type="password" />
        </LoginForm>
      </div>
    </DefaultLayout>
  );
};

export default Login;
