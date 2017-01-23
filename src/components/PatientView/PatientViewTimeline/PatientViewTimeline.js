import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import PatientViewTimelineEvent from './PatientViewTimelineEvent';

import patientProps from '../../../prop-types/patient';

export default class PatientViewTimeline extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      timelineSearchTerm: ''
    };
  }

  patientEvents() {
    let events = [];

    if (this.props.patient != null) {
      let encounters = this.props.patient.Encounter;
      let conditions = this.props.patient.Condition;
      let medications = this.props.patient.MedicationStatement;
      // let riskAssessments = this.props.patient.RiskAssessment;

      if (encounters != null) {
        encounters.forEach((encounter) => {
          events.push({
            event: encounter,
            type: 'encounter',
            displayText: encounter.type[0].text,
            startDate: encounter.period.start,
            endDate: encounter.period.end
          });
        });
      }

      if (conditions != null) {
        conditions.forEach((condition) => {
          if (condition.verificationStatus === 'confirmed') {
            events.push({
              event: condition,
              type: 'condition',
              displayText: condition.code.text,
              startDate: condition.onsetDateTime,
              endDate: condition.abatementDateTime
            });
          }
        });
      }

      if (medications != null) {
        medications.forEach((medication) => {
          events.push({
            event: medication,
            type: 'medication',
            displayText: medication.medicationCodeableConcept.text,
            startDate: medication.effectivePeriod.start,
            endDate: medication.effectivePeriod.end
          });
        });
      }

      // riskAssessments.forEach((riskAssessment) => {
      // });
    }

    // ** ember code:
    // this.get('risksByOutcome').map(function(outcome) {
    //   let riskTransitions = outcome.values.map(function(e, i) {
    //     let previousRisk = outcome.values[i - 1];
    //
    //     if (!previousRisk) {
    //       let displayText = `Risk of '${outcome.key}' started at ${e.get('value')}`;
    //       return e.store.createRecord('risk-event', { event: e, displayText, deltaRisk: e.get('value') , type: 'riskIncreased' });
    //     }
    //
    //     let deltaRisk = e.get('value') - previousRisk.get('value');
    //     let direction = deltaRisk > 0 ? 'increased' : 'decreased';
    //     let displayText = `Risk of '${outcome.key}' ${direction} from ${previousRisk.get('value')} to ${e.get('value')}`;
    //     return e.store.createRecord('risk-event', { event: e, displayText, deltaRisk , type: `risk${direction.capitalize()}` });
    //   });
    //
    //   events.push(...riskTransitions.filter((e) => e.get('deltaRisk') !== 0));
    // });

    return _.sortBy(events, 'startDate').reverse();
  }

  filteredEvents() {
    // let rx = new RegExp(this.state.timelineSearchTerm, 'gi');
    return [];
    // return this.get('patient.events').filter(function(e) {
    //   return e.get('event.displayText').match(rx);
    // });
  }

  renderedEvents() {
    let patientEvents = this.patientEvents();

    return patientEvents.map((event, index) => {
      return (
        <PatientViewTimelineEvent key={index} patient={this.props.patient} event={event} />
      );
    });
  }

  render() {
    return (
      <div className="patient-view-timeline">
        <div className="timeline-icon-search">
          <FontAwesome name="user" className="timeline-icon" />

          <div className="search search-timeline">
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button"><FontAwesome name="search" /></button>
              </span>
              <input type="search"
                     className="form-control"
                     value={this.state.timelineSearchTerm}
                     onChange={(e) => this.setState({ timelineSearchTerm: e.target.value })}
                     placeholder="Search timeline..." />
            </div>
          </div>
        </div>

        <div className="patient-view-timeline-events">
          <div className="timeline-line"></div>
          {this.renderedEvents()}
        </div>
      </div>
    );
  }
}

PatientViewTimeline.displayName = 'PatientViewTimeline';

PatientViewTimeline.propTypes = {
  patient: patientProps
};
