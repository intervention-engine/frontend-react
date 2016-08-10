import React, { Component } from 'react';

import Nav from "./Nav"

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Nav />
      </header>
    );
  }
}

Header.displayName = 'Header';
