import React, { Component } from 'react';

import PageHeader from '../components/Header/PageHeader';

export default class Patients extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader title="Patients" />

        <div>Patients</div>
      </div>
    );
  }
}

Patients.displayName = 'Patients';
