import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import NextHuddleDate from '../../../elements/NextHuddleDate';

import { isTodayOrAfter } from '../../../reducers/huddle';
import sortByDate from '../../../utils/sort_by_date';
import param from '../../../utils/param';
import { getHuddleReasonIcon, getPatientAgeIcon, getPatientGenderIcon } from '../../../utils/icon';

import patientProps from '../../../prop-types/patient';
import huddleProps from '../../../prop-types/huddle';
import riskServiceProps from '../../../prop-types/risk_service';
import careTeamProps from '../../../prop-types/care_team';

export default class PatientListResultsItem extends Component {
  renderedNextHuddle(nextHuddle) {
    if(!nextHuddle) { return; }

    return (
      <NextHuddleDate huddleIconName={getHuddleReasonIcon(nextHuddle.reason_type)}
                      huddleGroupName={nextHuddle.care_team_name}
                      huddleReason={nextHuddle.reason}
                      huddleDate={nextHuddle.huddle_date} />
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

  renderedRisk() {
    if (this.props.patient.recent_risk_assessment == null) { return; }

    let risk = this.props.patient.recent_risk_assessment.value;
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

  render() {
    let params = {};
    if (this.props.selectedRiskService) { params.riskService = this.props.selectedRiskService.id; }
    if (this.props.selectedCareTeam) { params.careTeamId = this.props.selectedCareTeam.id; }

    let linkHref = `/patients/${this.props.patient.id}?${param(params, true)}`;

    return (
      <Link className="patient-list-results-item" to={linkHref}>
        <div>
          <div className="media">
            <div className="media-left media-middle">
              <FontAwesome name="user" className="media-object" />
            </div>

            <div className="media-body">
              <div className="row">
                <div className="patient-name col-xs-12">{this.props.patient.name.family}, {this.props.patient.name.given}</div>
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
                  {this.renderedNextHuddle(this.props.patient.next_huddle)}
                </div>

                <div className="col-md-4 patient-risk-bar-container">
                  {this.renderedRisk()}
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
  huddles: PropTypes.arrayOf(huddleProps),
  selectedRiskService: riskServiceProps,
  selectedCareTeam: careTeamProps
};

PatientListResultsItem.displayName = 'PatientListResultsItem';
