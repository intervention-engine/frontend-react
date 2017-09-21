import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import PatientViewBanner from './PatientViewBanner/PatientViewBanner';
import PatientViewStats from './PatientViewStats/PatientViewStats';
import PatientViewRiskAsterChart from './PatientViewRiskAsterChart/PatientViewRiskAsterChart';
import PatientViewTimeline from './PatientViewTimeline/PatientViewTimeline';

import patientProps from '../../prop-types/patient';
import careTeamProps from '../../prop-types/care_team';
import huddleProps from '../../prop-types/huddle';
import riskServiceProps from '../../prop-types/risk_service';
import riskAssessmentProps from '../../prop-types/risk_assessment';
import riskAssessmentBreakdownProps from '../../prop-types/risk_assessment_breakdown';

export default class PatientView extends Component {
  componentWillMount() {
    // select default risk service
    if (this.props.selectedRiskService == null && this.props.riskServices.length > 0) {
      this.props.selectRiskService(this.props.riskServices[0]);
    }
  }

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

            <div className="patient-panel-body row">
              <div className="patient-panel-body-section col-xs-12">
                <PatientViewBanner patient={this.props.patient}
                                   riskAssessments={this.props.riskAssessments}
                                   huddles={this.props.huddles}
                                   selectedRiskService={this.props.selectedRiskService }
                                   selectRiskAssessment={this.props.selectRiskAssessment}
                                   selectedRiskAssessment={this.props.selectedRiskAssessment} />
              </div>

              <div className="patient-panel-body-section col-xs-3">
                <PatientViewStats patient={this.props.patient}
                                  careTeams={this.props.careTeams}
                                  selectedCareTeam={this.props.selectedCareTeam}
                                  huddles={this.props.huddles}
                                  selectedHuddle={this.props.selectedHuddle}
                                  riskServices={this.props.riskServices}
                                  riskAssessments={this.props.riskAssessments}
                                  selectedRiskService={this.props.selectedRiskService}
                                  selectCareTeam={this.props.selectCareTeam}
                                  selectHuddle={this.props.selectHuddle}
                                  selectRiskService={this.props.selectRiskService}
                                  addPatientToHuddle={this.props.addPatientToHuddle} />
              </div>

              <div className="patient-panel-body-section col-xs-4">
                <PatientViewRiskAsterChart riskAssessmentBreakdown={this.props.riskAssessmentBreakdown}
                                           selectedRiskAssessment={this.props.selectedRiskAssessment} />
              </div>

              <div className="patient-panel-body-section col-xs-5">
                <PatientViewTimeline patient={this.props.patient} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PatientView.displayName = 'PatientView';

PatientView.propTypes = {
  patient: patientProps,
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  riskServices: PropTypes.arrayOf(riskServiceProps),
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectedRiskAssessment: riskAssessmentProps,
  riskAssessmentBreakdown: PropTypes.arrayOf(riskAssessmentBreakdownProps),
  selectedRiskService: riskServiceProps.isRequired,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  selectRiskService: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};
