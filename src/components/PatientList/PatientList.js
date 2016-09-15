import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import PatientListSelectors from './PatientListSelectors/PatientListSelectors';
import PatientListResults from '../PatientListResults/PatientListResults';
import { loadPatients } from '../../actions/patient';

class PatientList extends Component {
  componentWillReceiveProps(nextProps) {
    let groupIds = nextProps.population.selectedPopulations.map((p) => p.id);
    if(nextProps.population.populationSelectorType === 'union' && groupIds.length > 0){
      groupIds = groupIds.join(',');
    }
    this.props.loadPatients({groupId: groupIds});
  }

  render(){
    return (
      <div className="patient-list row">
        <PatientListSelectors/>
        <PatientListResults/>
      </div>
    );
  }
}

PatientList.displayName = 'PatientList';

PatientList.propTypes = {
  loadPatients: PropTypes.func.isRequired,
  population: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    population: state.population
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
