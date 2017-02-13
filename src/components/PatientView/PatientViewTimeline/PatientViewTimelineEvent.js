import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import patientProps from '../../../prop-types/patient';

export default class PatientViewTimelineEvent extends Component {
  eventIcon() {
    let eventType = this.props.event.type;

    if (eventType === 'condition') {
      return 'fc-med-clipboard';
    } else if (eventType === 'medication') {
      return 'fc-medication';
    } else if (eventType === 'encounter') {
      return 'fa fa-hospital-o';
    } else if (eventType === 'risk-increase') {
      return 'fa fa-arrow-circle-up text-danger';
    } else if (eventType === 'risk-decrease') {
      return 'fa fa-arrow-circle-down text-success';
    } else {
      return '';
    }
  }

  renderedEventText() {
    if (this.props.event != null) {
      return <div>{this.props.event.displayText}</div>;
    } else {
      return <div>Unknown Timeline Event</div>;
    }
  }

  renderedEventDate() {
    let eventDate;

    if (this.props.event.startDate) {
      eventDate = moment(this.props.event.startDate).format('lll');

      if (this.props.event.endDate != null) {
        eventDate+= ' - ' + moment(this.props.event.endDate).format('lll');
      }
    } else {
      eventDate = 'Unknown Date';
    }

    return <div>{eventDate}</div>;
  }

  render() {
    let eventClassNames = classNames('patient-view-timeline-event', this.props.event.type);

    return (
      <div className={eventClassNames}>
        <div className="timeline-event-text">
          {this.renderedEventText()}
        </div>

        <div className="timeline-event-date">
          {this.renderedEventDate()}
        </div>

        <div className="timeline-event-icon">
          <i className={this.eventIcon()}></i>
        </div>

        <span className="pointer-bottom"></span>
        <span className="pointer-top"></span>
      </div>
    );
  }
}

PatientViewTimelineEvent.displayName = 'PatientViewTimelineEvent';

PatientViewTimelineEvent.propTypes = {
  patient: patientProps,
  event: PropTypes.object.isRequired
};
