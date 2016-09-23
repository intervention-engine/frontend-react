import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import equal from 'deep-equal';


import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from './PatientListResults/PatientListResults';
import { fetchPatients } from '../../actions/patient';

class PatientList extends Component {
  componentWillReceiveProps(nextProps) {
    // population params
    let groupIds = nextProps.population.selectedPopulations.map((p) => p.id);
    if(nextProps.population.populationSelectorType === 'union' && groupIds.length > 0) {
      groupIds = groupIds.join(',');
    }
    let groupIdParams = { groupId: groupIds };

    // sort params
    let sortDir = nextProps.sortAscending ? '' : '-';
    if (nextProps.sortOption.invert) { sortDir = sortDir === '' ? '-' : ''; }
    let sortParams = { _sort: `${sortDir}${nextProps.sortOption.sortKey}` };

    // fetch patients with params when nextProps have changed
    if (!equal(nextProps.population, this.props.population) ||
        !equal(nextProps.sortAscending, this.props.sortAscending) ||
        !equal(nextProps.sortOption, this.props.sortOption)) {
      this.props.fetchPatients({ ...groupIdParams, ...sortParams });
    }
  }

  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors/>
        <PatientListResults patients={this.props.patient}/>
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  fetchPatients: PropTypes.func.isRequired,
  population: PropTypes.object,
  patient: PropTypes.object,
  sortOption: PropTypes.object.isRequired,
  sortAscending: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatients }, dispatch);
}

function mapStateToProps(state) {
  let patient = {
    patients: state.patient.patients.map((id) => state.patient.resources[id]),
    meta: state.patient.meta
  };
  return {
    population: state.population,
    sortOption: state.sort.sortOption,
    sortAscending: state.sort.sortAscending,
    patient
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
