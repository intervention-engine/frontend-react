import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

// import NextHuddleDate from '../../../elements/NextHuddleDate';
import PatientViewBannerRiskChart from './PatientViewBannerRiskChart';

import { getPatientAgeIcon, getPatientGenderIcon/*, getHuddleReasonIcon*/ } from '../../../utils/icon';
// import nextHuddleForPatients from '../../../utils/next_huddle_for_patients';

import patientProps from '../../../prop-types/patient';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import huddleGroupProps from '../../../prop-types/huddle_group';

export default class PatientViewBannerSummary extends Component {
  renderedNextHuddle() {
    return;
    // if (this.props.huddles == null) { return; }
    // let nextHuddles = nextHuddleForPatients(this.props.huddles);
    // let nextHuddle = nextHuddles[this.props.patient.id];
    // if (nextHuddle == null) { return; }
    //
    // return (
    //   <NextHuddleDate huddleIconName={getHuddleReasonIcon(nextHuddle.huddlePatient.reason.code)}
    //                   huddleGroupName={nextHuddle.huddleGroup.name}
    //                   huddleReason={nextHuddle.huddlePatient.reason.text}
    //                   huddleDate={nextHuddle.huddle.datetime} />
    // );
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
      fullName = this.props.patient.name.full;
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
            {this.renderedNextHuddle()}
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
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedRiskAssessment: riskAssessmentProps,
  selectRiskAssessment: PropTypes.func.isRequired
};
