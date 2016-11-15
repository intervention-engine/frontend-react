import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import PatientViewBanner from './PatientViewBanner/PatientViewBanner';

import patientProps from '../../prop-types/patient';
import huddleGroupProps from '../../prop-types/huddle_group';
import riskAssessmentTypeProps from '../../prop-types/risk_assessment_type';
import riskAssessmentProps from '../../prop-types/risk_assessment';

export default class PatientView extends Component {
  render() {
    return (
      <div className="patient-view row">
        <div className="col-xs-12">
          <div className="patient-panel">
            <div className="patient-panel-header panel-heading">
              <Link to='/'>
                <FontAwesome name="chevron-left" /> Back to Patient List
              </Link>
            </div>

            <div className="patient-panel-body">
              <PatientViewBanner patient={this.props.patient}
                                 huddles={this.props.huddles}
                                 riskAssessments={this.props.riskAssessments}
                                 selectedRiskAssessment={this.props.selectedRiskAssessment} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

PatientView.displayName = 'PatientView';

PatientView.propTypes = {
  patient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired
};
