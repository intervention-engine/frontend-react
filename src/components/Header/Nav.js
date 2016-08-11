import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import Logo from './Logo';

const Nav = () => {
  return (
    <nav className="nav navbar navbar-static-top navbar-inverse">
      <div className="navbar-header">
        <Logo />

        <button type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>

      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" activeClassName="active">
              <FontAwesome name="user" /> Patients
            </Link>
          </li>

          <li>
            <Link to="/FilterBuilder" activeClassName="active">
              <FontAwesome name="filter" /> Filter Builder
            </Link>
          </li>

          <li>
            <Link to="/" onClick={(event) => event.preventDefault()}>
              <FontAwesome name="sign-out" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Nav.displayName = 'Nav';

export default Nav;
