import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

import { isTodayOrAfter } from '../../../reducers/huddle';
import sortByDate from '../../../utils/sort_by_date';

import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

const REASON_CODES = {
  ROLL_OVER: 'ROLL_OVER',
  MANUAL_ADDITION: 'MANUAL_ADDITION',
  RECENT_ENCOUNTER: 'RECENT_ENCOUNTER',
  RISK_SCORE: 'RISK_SCORE'
};

export default class PatientListResultsItem extends Component {
  renderedNextHuddle(patient, huddles) {
    let nextHuddles = huddles.map((huddleGroup) => {
      let dates = huddleGroup.dates.filter(this.filterHuddleForPatient(patient))
                                               .sort(sortByDate('datetime'));
      return {
        huddleGroupName: huddleGroup.name,
        reasonCode: dates[0] ? dates[0].patients[0].reason.code : null,
        reasonText: dates[0] ? dates[0].patients[0].reason.text : null,
        date: dates[0] ? dates[0].datetime : null };
    });
    nextHuddles = nextHuddles.filter((huddle) => huddle.date != null);
    if (nextHuddles.length === 0) { return; }
    let nextHuddle = nextHuddles.sort(sortByDate('date'))[0];
    let { date } = nextHuddle;

    let nextHuddleReason = { icon: '', text: '' };
    switch (nextHuddle.reasonCode) {
      case REASON_CODES.ROLL_OVER:
        nextHuddleReason = { icon: 'arrow-circle-o-right', text: 'Rolled Over From Last Huddle' };
        break;
      case REASON_CODES.MANUAL_ADDITION:
        nextHuddleReason = { icon: 'pencil', text: `Manually Added: ${nextHuddle.reasonText}` };
        break;
      case REASON_CODES.RECENT_ENCOUNTER:
        nextHuddleReason = { icon: 'hospital-o', text: 'Recent Encounter Warrants Discussion' };
        break;
      case REASON_CODES.RISK_SCORE:
        nextHuddleReason = { icon: 'pie-chart', text: 'Risk Score Warrants Discussion' };
        break;
    }

    return (
      <div>
        <div>
          <FontAwesome name={nextHuddleReason.icon} fixedWidth={true} data-tip={nextHuddleReason.text}/>
          <span data-tip={nextHuddle.huddleGroupName}> {moment(date).format('MMM D, YYYY')}</span>
        </div>

        <ReactTooltip />
      </div>
    );
  }

  filterHuddleForPatient(patient) {
    return (huddle) => {
      if (!isTodayOrAfter(huddle.datetime)) {
        return false;
      } else if (huddle.patients.find((searchPatient) => searchPatient.id === patient.id) == null) {
        return false;
      }

      return true;
    };
  }

  renderedRisk(patient, riskAssessment) {
    if (riskAssessment.length === 0) { return; }

    let patientRisk = riskAssessment[0].patients.find((patientRisk) => {
      return patientRisk.id === patient.id;
    });

    if (patientRisk != null) {
      let risk = patientRisk.risks[0].value;
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
    let genderIconClassName = 'user';
    if (this.props.patient.gender === 'male') {
      genderIconClassName = 'male';
    } else if (this.props.patient.gender === 'female') {
      genderIconClassName = 'female';
    }

    let ageIconClassName = 'fa fa-birthday-cake';
    let age = this.props.patient.age;
    if (age <= 3) {
      ageIconClassName = 'fc-baby';
    } else if (age <= 17) {
      ageIconClassName = 'fc-child';
    } else if (age <= 64) {
      ageIconClassName = 'fc-adult';
    } else if (age >= 65) {
      ageIconClassName = 'fc-elderly';
    }

    return (
      <div className="patient-list-results-item">
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
                    <i className={ageIconClassName}></i>{this.props.patient.age} yrs
                  </span>

                  <span className="patient-gender">
                    <FontAwesome name={genderIconClassName} /> {this.props.patient.gender}
                  </span>
                </div>
              </div>

              <div className="col-md-3 patient-next-huddle-date">
                {this.renderedNextHuddle(this.props.patient, this.props.huddles)}
              </div>

              <div className="col-md-4 patient-risk-bar-container">
                {this.renderedRisk(this.props.patient, this.props.riskAssessments)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PatientListResultsItem.propTypes = {
  patient: patientProps.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired
};

PatientListResultsItem.displayName = 'PatientListResultsItem';
