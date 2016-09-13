import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';

import 'pikaday/css/pikaday.css';
import './styles/application.scss';

const store = configureStore();

window.store = store;

render(
  <Root store={store} />,
  document.getElementById('app')
);
