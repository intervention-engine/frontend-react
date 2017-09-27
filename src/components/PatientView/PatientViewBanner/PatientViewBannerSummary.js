import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import NextHuddleDate from '../../../elements/NextHuddleDate';
import PatientViewBannerRiskChart from './PatientViewBannerRiskChart';

import { getPatientAgeIcon, getPatientGenderIcon, getHuddleReasonIcon } from '../../../utils/icon';

import patientProps from '../../../prop-types/patient';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import huddleProps from '../../../prop-types/huddle';

export default class PatientViewBannerSummary extends Component {
  renderedNextHuddle(nextHuddle) {
    if(!nextHuddle) { return; }

    return (
      <NextHuddleDate huddleIconName={getHuddleReasonIcon(nextHuddle.reason_type)}
                      huddleGroupName={nextHuddle.care_team_name}
                      huddleReason={nextHuddle.reason}
                      huddleDate={nextHuddle.huddle_date} />
    );
  }

  renderedRisk() {
    if (this.props.selectedRiskAssessment == null) { return; }

    let risk = this.props.selectedRiskAssessment.value;
    return <span>{risk}</span>;
  }

  render() {
    if (this.props.patient == null) { return <div></div>; }

    let fullName = '';
    if (this.props.patient.name) {
      fullName = `${this.props.patient.name.family}, ${this.props.patient.name.given}`;
    }

    return (
      <div className="patient-view-banner-summary row">
        <div className="col-xs-1 patient-image">
          <FontAwesome name="user" />
        </div>

        <div className="col-xs-5 patient-stats">
          <div className="patient-stats-name">
            {fullName}
          </div>

          <span className="patient-stats-age">
            <i className={getPatientAgeIcon(this.props.patient.age)}></i>{this.props.patient.age} yrs
          </span>

          <span className="patient-stats-gender">
            <FontAwesome name={getPatientGenderIcon(this.props.patient.gender)} /> {this.props.patient.gender}
          </span>

          <span className="patient-stats-next-huddle">
            {this.renderedNextHuddle(this.props.patient.next_huddle)}
          </span>
        </div>

        <div className="col-xs-5 patient-risk-chart">
          <PatientViewBannerRiskChart riskAssessments={this.props.riskAssessments}
                                      selectRiskAssessment={this.props.selectRiskAssessment} />
        </div>

        <div className="col-xs-1 patient-risk-score">
          {this.renderedRisk()}
        </div>
      </div>
    );
  }
}

PatientViewBannerSummary.displayName = 'PatientViewBannerSummary';

PatientViewBannerSummary.propTypes = {
  patient: patientProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  huddles: PropTypes.arrayOf(huddleProps),
  selectedRiskAssessment: riskAssessmentProps,
  selectRiskAssessment: PropTypes.func.isRequired
};
