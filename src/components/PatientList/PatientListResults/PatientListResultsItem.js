import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { Link } from 'react-router';

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
  renderedNextHuddle(patient) {
    let nextHuddle = this.props.nextHuddles[patient.id];

    if (nextHuddle == null) {
      return;
    }

    let nextHuddleReasonIcon = '';
    switch (nextHuddle.huddlePatient.reason.code) {
    case REASON_CODES.ROLL_OVER:
      nextHuddleReasonIcon = 'arrow-circle-o-right';
      break;
    case REASON_CODES.MANUAL_ADDITION:
      nextHuddleReasonIcon = 'pencil';
      break;
    case REASON_CODES.RECENT_ENCOUNTER:
      nextHuddleReasonIcon = 'hospital-o';
      break;
    case REASON_CODES.RISK_SCORE:
      nextHuddleReasonIcon = 'pie-chart';
      break;
    }

    return (
      <div>
        <div>
          <FontAwesome name={nextHuddleReasonIcon}
                       fixedWidth={true}
                       data-tip={nextHuddle.huddlePatient.reason.text}/>
          <span data-tip={nextHuddle.huddleGroup.name}>
            {' '}{moment(nextHuddle.huddle.datetime).format('MMM D, YYYY')}
          </span>
        </div>

        <ReactTooltip />
      </div>
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
    if (!riskAssessment || riskAssessment.length === 0 || !riskAssessment.patients) { return; }

    let patientRisk = riskAssessment.patients.find((patientRisk) => {
      return patientRisk.id === patient.id;
    });

    if (patientRisk != null) {
      let risk = patientRisk.risks.sort((a,b) => new Date(b.datetime) - new Date(a.datetime))[0].value;
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
      <Link to={`/patients/${this.props.patient.id}`}>
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
      </Link>
    );
  }
}

PatientListResultsItem.propTypes = {
  patient: patientProps.isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments:riskAssessmentProps,
  nextHuddles: PropTypes.object.isRequired
};

PatientListResultsItem.displayName = 'PatientListResultsItem';
