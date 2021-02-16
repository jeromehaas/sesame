import React from 'react';

import { Provider } from 'react-redux';
import App from './_app';
import styles from '../styles/Home.module.scss';
import themeReducer from '../redux/reducers/index';
import Login from './Login';
import DefaultLayout from '../components/partials/layouts/DefaultLayout';

interface Props {
}

const Home: React.FunctionComponent<Props> = (props) => (
  <div>
    <DefaultLayout>
      <div id={styles.wrapper}>
        <div id={styles.spinnerAnimation}>
          <i><img id={styles.spinner4} src="/media/graphics/spinnerAnimation/layer-4.svg" /></i>
          <i><img id={styles.spinner3} src="/media/graphics/spinnerAnimation/layer-3.svg" /></i>
          <i><img id={styles.spinner2} src="/media/graphics/spinnerAnimation/layer-2.svg" /></i>
          <i><img id={styles.spinner1} src="/media/graphics/spinnerAnimation/layer-1.svg" /></i>

        </div>

        <div id={styles.teaser}>
          <h2 id={styles.teaser}>
            Easy
            <span className={styles.highlight}> access management</span>
            {' '}
            for your organisation or household
          </h2>
        </div>
      </div>
    </DefaultLayout>
  </div>
);

export default Home;
