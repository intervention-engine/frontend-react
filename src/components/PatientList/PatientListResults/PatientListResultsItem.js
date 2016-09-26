import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import _ from 'lodash';

import huddleGroupProps from '../../../prop-types/huddle_group';
import patientProps from '../../../prop-types/patient';
import riskAssessmentProps from '../../../prop-types/risk_assessment';
import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';
import sortByDate from '../../../utils/sort_by_date';
import { isTodayOrAfter } from '../../../reducers/huddle';

class PatientListResultsItem extends Component {
  renderedNextHuddle(patient, huddles) {
    let nextHuddles = huddles.map((huddleGroup) => {
      let dates = huddleGroup.dates.filter(this.filterHuddleForPatient(patient))
                                               .sort(sortByDate('datetime'));
      return { huddleGroupName: huddleGroup.name, date: dates[0] ? dates[0].datetime : null };
    });
    nextHuddles = nextHuddles.filter((huddle) => huddle.date != null);

    if (nextHuddles.length === 0) {
      return;
    }

    let nextHuddle = nextHuddles.sort(sortByDate('date'))[0];
    let { huddleGroupName, date } = nextHuddle;

    return (<div>{moment(date).format('ddd, MMM Do YYYY')} {huddleGroupName}</div>);
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
    let patientRisk = riskAssessment[0].patients.find((patientRisk) => {
      return patientRisk.id === patient.id;
    });
    return <div>{patientRisk.risks[0].value}</div>
  }

  render() {
    let genderIconClassName = 'user';
    if (this.props.patient.gender === 'male') {
      genderIconClassName = 'male';
    } else if (this.props.patient.gender === 'female') {
      genderIconClassName = 'female';
    }

    return (
      <div className="patient-info">
        <div className="media">
          <div className="media-left media-middle">
            <FontAwesome name="user" className="media-object" />
          </div>
        </div>

        <div className="media-body">
          <div className="row">
            <div className="patient-name col-xs-12">{this.props.patient.name.full}</div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="patient-age-gender-location">
                <span className="patient-age">
                  <FontAwesome name="elderly" /> {this.props.patient.age} yrs
                </span>

                <span className="patient-gender">
                  <FontAwesome name={genderIconClassName} /> {this.props.patient.gender}
                </span>
              </div>
            </div>

            <div className="col-md-3">
              {this.renderedNextHuddle(this.props.patient, this.props.huddles)}
            </div>

            <div className="col-md-3">
              {this.renderedRisk(this.props.patient, this.props.riskAssessments)}
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
  selectedHuddleGroup: huddleGroupProps,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps
};

PatientListResultsItem.displayName = 'PatientListResultsItem';

export default PatientListResultsItem;
