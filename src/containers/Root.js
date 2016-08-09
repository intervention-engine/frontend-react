import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router, hashHistory } from 'react-router';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory} routes={routes} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

Root.displayName = 'Root';
