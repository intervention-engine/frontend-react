import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPatients } from '../../actions/PatientListResults/index';
import PatientListResultsItem from './PatientListResultsItem';

class PatientListResults extends Component {

  componentWillMount() {
    this.props.loadPatients(this.props.queryParams);
  }
  render() {
    const { patientEntries } = this.props.patients;
    return (
      <div className='col-md-9 col-sm-8'>
        <div className="panel patient-panel">
          <div className="panel-heading">
            <div className="collapse-panel-title">
              Patients ({this.props.patients.meta.total})
              <div className="patient-list-results-buttons pull-right">
                <div className="sliding-search-container">
                  <i className="fa fa-search fa-fw"></i>
                  <input
                    type="search"
                    className="sliding-search expanded"/>
                </div>
                <i className="print-list-button fa fa-print cursor-pointer" title="Print Patient List"></i>
              </div>
            </div>
          </div>
        </div>
        {patientEntries.map((pat) =>
          <PatientListResultsItem key={pat.id} patient={pat}/>
        )}
      </div>
    );
  }
}

PatientListResults.propTypes = {
  loadPatients: PropTypes.func,
  patients: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPatients }, dispatch);
}

function mapStateToProps(state) {
  return {
    patients: state.patientListResults
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListResults);



// <div class="col-md-9 col-sm-8 patient-list-results">
//
//
//       <div class="panel-body">
//         <div class="patient-list">
//           {{#each populationPatients as |patient|}}
//             {{patient-badge patient=patient huddles=(patient-huddles model.huddles patient) assessment=currentAssessment}}
//           {{/each}}
//
//           {{page-numbers content=content.patients action=(action 'setPage')}}
//         </div>
//       </div>
//     </div>
//   </div>
