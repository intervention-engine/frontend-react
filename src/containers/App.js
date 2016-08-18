import React from 'react';

import Header from '../components/Header/Header';

const App = (props) => {
  const { children } = props; // eslint-disable-line

  return (
    <div className="app">
      <Header />
      {children}
    </div>
  );
};

App.displayName = 'App';

export default App;
