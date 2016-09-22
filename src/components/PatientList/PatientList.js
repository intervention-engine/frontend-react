import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import equal from 'deep-equal';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from './PatientListResults/PatientListResults';
import { fetchPatients } from '../../actions/patient';
import huddleProps from '../../prop-types/huddle';

class PatientList extends Component {
  componentWillReceiveProps(nextProps) {
    // population params
    let groupIds = nextProps.population.selectedPopulations.map((p) => p.id);
    if(nextProps.population.populationSelectorType === 'union' && groupIds.length > 0) {
      groupIds = [groupIds.join(',')];
    }

    // huddle params -- concat to groupId
    if (nextProps.selectedHuddle != null) {
      groupIds.push(nextProps.selectedHuddle.id);
    }

    // group params (population + huddle params)
    let groupIdParams = {};
    if (groupIds.length > 0) {
      groupIdParams = { _query: 'group', groupId: groupIds };
    }

    // sort params
    let sortDir = nextProps.sortAscending ? '' : '-';
    if (nextProps.sortOption.invert) { sortDir = sortDir === '' ? '-' : ''; }
    let sortParams = { _sort: `${sortDir}${nextProps.sortOption.sortKey}` };

    // fetch patients with params when nextProps has changed
    if (!equal(nextProps.population, this.props.population) ||
        !equal(nextProps.sortAscending, this.props.sortAscending) ||
        !equal(nextProps.sortOption, this.props.sortOption) ||
        !equal(nextProps.selectedHuddle, this.props.selectedHuddle)) {
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
  patient: PropTypes.object,
  population: PropTypes.object,
  selectedHuddle: huddleProps,
  sortOption: PropTypes.object.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  fetchPatients: PropTypes.func.isRequired
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
    patient,
    population: state.population,
    selectedHuddle: state.huddle.selectedHuddle,
    sortOption: state.sort.sortOption,
    sortAscending: state.sort.sortAscending
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
