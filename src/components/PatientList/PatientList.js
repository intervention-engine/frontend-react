import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import equal from 'deep-equal';

import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from './PatientListResults/PatientListResults';
import { fetchPatients } from '../../actions/patient';

import huddleProps from '../../prop-types/huddle';
import huddleGroupProps from '../../prop-types/huddle_group';
import riskAssessmentProps from '../../prop-types/risk_assessment';
import riskAssessmentTypeProps from '../../prop-types/risk_assessment_type';

class PatientList extends Component {
  componentWillReceiveProps(nextProps) {
    // population params
    let groupIds = nextProps.population.selectedPopulations.map((pop) => pop.id);
    let joinedGroupIds = [ groupIds.join(',') ];
    if (nextProps.population.populationSelectorType === 'union' && groupIds.length > 0) {
      groupIds = joinedGroupIds;
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

    // fetch patients and risks with params when nextProps has changed
    if (!equal(nextProps.population, this.props.population) ||
        !equal(nextProps.sortAscending, this.props.sortAscending) ||
        !equal(nextProps.sortOption, this.props.sortOption) ||
        !equal(nextProps.selectedHuddle, this.props.selectedHuddle)) {
      this.props.fetchPatients({
        ...groupIdParams,
        ...sortParams,
        riskAssessment: this.props.selectedRiskAssessment
      });
    }
  }

  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors />
        <PatientListResults patients={this.props.patients}
                            totalPatients={this.props.totalPatients}
                            huddles={this.props.huddles}
                            selectedHuddleGroup={this.props.selectedHuddleGroup}
                            riskAssessments={this.props.riskAssessments}
                            selectedRiskAssessment={this.props.selectedRiskAssessment} />
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  patient: PropTypes.object,
  totalPatients: PropTypes.number,
  population: PropTypes.object,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  selectedHuddle: huddleProps,
  selectedHuddleGroup: huddleGroupProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps,
  sortOption: PropTypes.object.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  fetchPatients: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    patients: state.patient.patients,
    totalPatients: state.patient.meta.total,
    population: state.population,
    huddles: state.huddle.huddles,
    selectedHuddle: state.huddle.selectedHuddle,
    selectedHuddleGroup: state.huddle.selectedHuddleGroup,
    riskAssessments: state.riskAssessment.riskAssessments,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment,
    sortOption: state.sort.sortOption,
    sortAscending: state.sort.sortAscending
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
