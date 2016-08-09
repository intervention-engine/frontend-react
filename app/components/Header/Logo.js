import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <Link className="logo navbar-brand" to="/">
        <img className="header-logo" alt="Interention Engine logo" src="assets/images/logo.png" />
      </Link>
    );
  }
}

Logo.displayName = 'Logo';
