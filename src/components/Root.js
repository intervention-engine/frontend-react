import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router, hashHistory } from 'react-router';

const Root = (props) => {
  const { store } = props;

  return (
    <Provider store={store} className="root">
      <div>
        <Router history={hashHistory} routes={routes} />
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

Root.displayName = 'Root';

export default Root;
