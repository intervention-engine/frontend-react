import React, { Component } from 'react';

import PageHeader from '../components/Header/PageHeader';

export default class FilterBuilder extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader title="Filter Builder" />
        
        <div>Filter Builder</div>
      </div>
    );
  }
}

FilterBuilder.displayName = 'FilterBuilder';
