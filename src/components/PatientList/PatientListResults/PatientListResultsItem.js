import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import NextHuddleDate from '../../../elements/NextHuddleDate';

import { isTodayOrAfter } from '../../../reducers/huddle';
import sortByDate from '../../../utils/sort_by_date';
import { getHuddleReasonIcon, getPatientAgeIcon, getPatientGenderIcon } from '../../../utils/icon';
import patientRisk from '../../../utils/patient_risk';

import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';

export default class PatientListResultsItem extends Component {
  renderedNextHuddle(patient) {
    let nextHuddle = this.props.nextHuddles[patient.id];

    if (nextHuddle == null) {
      return;
    }

    return (
      <NextHuddleDate huddleIconName={getHuddleReasonIcon(nextHuddle.huddlePatient.reason.code)}
                      huddleGroupName={nextHuddle.huddleGroup.name}
                      huddleReason={nextHuddle.huddlePatient.reason.text}
                      huddleDate={nextHuddle.huddle.datetime} />
    );
  }

  filterHuddlesForPatient(huddleGroup, patient) {
    let patientHuddles = huddleGroup.dates.filter((huddle) => {
      if (!isTodayOrAfter(huddle.datetime)) {
        return false;
      } else if (huddle.patients && huddle.patients.find((searchPatient) => searchPatient.id === patient.id) == null) {
        return false;
      }

      return true;
    });

    return patientHuddles.sort(sortByDate('datetime'));
  }

  renderedRisk(patient, riskAssessment) {
    let risk = patientRisk(patient, riskAssessment);

    if (risk) {
      let maxRisk = 4; // TODO: get from backend
      let barWidth = Math.floor(100 / maxRisk * risk);
      let riskBarWidth = { width: `${barWidth}px` };

      return (
        <div className="patient-risk-bar" style={riskBarWidth}>
          <span className="patient-risk">
            {risk}
          </span>
        </div>
      );
    }
  }

  render() {
    return (
      <Link className="patient-list-results-item" to={`/patients/${this.props.patient.id}?riskAssessment=${this.props.selectedRiskAssessment.method}`}>
      <div >
        <div className="media">
          <div className="media-left media-middle">
            <FontAwesome name="user" className="media-object" />
          </div>

          <div className="media-body">
            <div className="row">
              <div className="patient-name col-xs-12">{this.props.patient.name.full}</div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="patient-age-gender">
                  <span className="patient-age">
                    <i className={getPatientAgeIcon(this.props.patient.age)}></i>{this.props.patient.age} yrs
                  </span>

                  <span className="patient-gender">
                    <FontAwesome name={getPatientGenderIcon(this.props.patient.gender)} /> {this.props.patient.gender}
                  </span>
                </div>
              </div>

              <div className="col-md-3 patient-next-huddle-date">
                {this.renderedNextHuddle(this.props.patient, this.props.huddles)}
              </div>

              <div className="col-md-4 patient-risk-bar-container">
                {this.renderedRisk(this.props.patient, this.props.filteredRiskAssessments)}
              </div>
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  }
}

PatientListResultsItem.propTypes = {
  patient: patientProps.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  filteredRiskAssessments: riskAssessmentProps,
  nextHuddles: PropTypes.object.isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
};

PatientListResultsItem.displayName = 'PatientListResultsItem';
