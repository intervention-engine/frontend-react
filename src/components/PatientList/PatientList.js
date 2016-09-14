import React, { Component } from 'react';
import { connect } from 'react-redux';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from '../PatientListResults/PatientListResults';

class PatientList extends Component {

  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors />
        <PatientListResults queryParams = {{groupIds: this.props.population.selectedPopulations}}/>
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

function mapStateToProps(state) {
  return {
    population: state.population
  };
}

export default connect(mapStateToProps, {})(PatientList);
