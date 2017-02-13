import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import PatientViewTimelineEvent from './PatientViewTimelineEvent';

import patientProps from '../../../prop-types/patient';

export default class PatientViewTimeline extends Component {
  constructor(...args) {
    super(...args);

    let patientEvents = this.patientEvents(this.props.patient);

    this.state = {
      timelineSearchTerm: '',
      patientEvents,
      filteredEvents: patientEvents
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.patient !== nextProps.patient) {
      let patientEvents = this.patientEvents(nextProps.patient);
      let filteredEvents = this.filterEventsByTerm(patientEvents, this.state.timelineSearchTerm);

      this.setState({ patientEvents, filteredEvents });
    }
  }

  patientEvents(patient) {
    let events = [];

    if (patient != null) {
      let encounters = patient.Encounter;
      let conditions = patient.Condition;
      let medications = patient.MedicationStatement;

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
    }

    return _.sortBy(events, 'startDate').reverse();
  }

  filterEvents(event) {
    let timelineSearchTerm = event.target.value;
    let filteredEvents = this.filterEventsByTerm(this.state.patientEvents, timelineSearchTerm);

    this.setState({ timelineSearchTerm, filteredEvents });
  }

  filterEventsByTerm(events, term) {
    if (term === '') {
      return events;
    }

    let rx = new RegExp(term, 'gi');
    return events.filter((timelineEvent) => timelineEvent.displayText.match(rx));
  }

  renderedEvents() {
    return this.state.filteredEvents.map((event, index) => {
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
                     onChange={this.filterEvents.bind(this)}
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
