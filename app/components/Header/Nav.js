import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import Logo from './Logo';

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-inverse">
        <div className="container">
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
            <ul className="nav navbar-nav">
              <li>
                <Link to="/Patients" activeClassName="active" className="navbar-brand">
                  <FontAwesome name="user" /> Patients
                </Link>
              </li>

              <li>
                <Link to="/" activeClassName="active" className="navbar-brand">
                  <FontAwesome name="filter" /> Filter Builder
                </Link>
              </li>

              <li role="presentation" className="dropdown">
                <a href="#"
                   className="dropdown-toggle"
                   data-toggle="dropdown"
                   role="button"
                   aria-haspopup="true"
                   aria-expanded="false">
                  Name <span className="caret"></span>
                </a>

                <ul className="dropdown-menu">
                  <li><a href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.displayName = 'Nav';
