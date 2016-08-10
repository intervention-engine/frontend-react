import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';

export default class App extends Component {
  render() {
    const { children } = this.props; //eslint-disable-line

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

App.displayName = 'App';
