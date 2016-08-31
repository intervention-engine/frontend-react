import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const App = (props) => {
  const { children } = props; // eslint-disable-line

  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

App.displayName = 'App';

export default App;
