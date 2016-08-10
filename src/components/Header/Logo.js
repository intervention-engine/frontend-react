import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <Link className="logo navbar-brand" to="/">
        <img className="header-logo" alt="Intervention Engine logo" src="assets/images/logo-3x.png" width="300px" />
      </Link>
    );
  }
}

Logo.displayName = 'Logo';
