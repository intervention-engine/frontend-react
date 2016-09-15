import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import equal from 'deep-equal';


import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from '../PatientListResults/PatientListResults';
import { loadPatients } from '../../actions/patient';

class PatientList extends Component {

  componentWillReceiveProps(nextProps) {
    let groupIds = nextProps.population.selectedPopulations.map((p) => p.id);
    if(nextProps.population.populationSelectorType === 'union' && groupIds.length > 0){
      groupIds = groupIds.join(',');
    }
    if (!equal(nextProps.population, this.props.population)) {
      this.props.loadPatients({groupId: groupIds});
    }
  }

  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors/>
        <PatientListResults patients={this.props.patients}/>
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  loadPatients: PropTypes.func.isRequired,
  population: PropTypes.object,
  patients: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    population: state.population,
    patients: state.patientListResults
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
