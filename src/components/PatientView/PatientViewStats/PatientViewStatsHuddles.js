import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Pikaday from 'pikaday';
import Stylesheet from '../../../utils/stylesheet';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

import huddleProps from '../../../prop-types/huddle';
import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';

export default class PatientViewStatsHuddles extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedDate: new Date()
    };

    this.stylesheet = null;
  }

  componentDidMount() {
    this.picker = new Pikaday({
      defaultDate: this.state.selectedDate,
      setDefaultDate: true,
      onSelect: (selectedDate) => {
        this.setState({ selectedDate });

        // find huddle
        let huddle = this.patientHuddles().find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));

        // select huddle
        if (huddle != null) {
          this.props.selectHuddle(huddle);
        }
      }
    });

    let field = document.getElementById('patientViewPikadayCalendar');
    if (field) { field.appendChild(this.picker.el); }
  }

  componentDidUpdate() {
    this.setPikadayStyles();
  }

  setPikadayStyles() {
    if (this.props.huddles == null) {
      return;
    }

    if (this.stylesheet) {
      this.stylesheet.remove();
    }

    this.stylesheet = new Stylesheet();

    let huddles = this.patientHuddles();
    for (let i = 0; i < huddles.length; i++) {
      let date = moment(huddles[i].datetime);
      let patientReviewed = false;
      // let patientReviewed = this.props.huddles[i].patientReviewed(this.props.patient);

      let year = date.year();
      let month = date.month();
      let day = date.date();

      let backgroundColor = '#5D8FAE';
      let boxShadow = '#53809c';
      if (patientReviewed) {
        backgroundColor = '#5C5C5C';
        boxShadow = '#525252';
      }

      let cssRule = `background-color: ${backgroundColor};
                     color: #fff;
                     border-radius: 3px;
                     box-shadow: inset 0 1px 3px ${boxShadow};`;
      this.stylesheet.addRule(`#patientViewPikadayCalendar [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, cssRule);
    }
  }

  patientHuddles() {
    let huddles = [];

    for (let i = 0; i < this.props.huddles.length; ++i) {
      for (let j = 0; j < this.props.huddles[i].dates.length; ++j) {
        if (this.props.huddles[i].dates[j].patients.find((huddlePatient) => huddlePatient.id === this.props.patient.id)) {
          huddles.push(this.props.huddles[i].dates[j]);
        }
      }
    }

    return huddles;
  }

  renderedHuddlesDetailsIcons() {
    return <div></div>;

    // if (selectedScheduleHuddle) {
    //   if (selectedScheduleHuddlePatient.reason === 'MANUAL_ADDITION') {
    //     return <i className="fa fa-edit" onclick={this.displayEditHuddleModal(true)}></i>;
    //   }
    //
    //   if (!selectedScheduleHuddlePatient.reviewed) {
    //     return <i className="fa fa-check-square-o" onclick={this.openReviewPatientModal(selectedScheduleHuddle)}></i>;
    //   }
    // } else {
    //   return <i className="fa fa-plus-circle" onclick={this.openAddHuddleModal(selectedScheduleDate)}></i>;
    // }
  }

  renderedSelectedHuddleDetails() {
    return <div></div>;

    // if (this.props.selectedHuddle.reason) {
    //   return (
    //     <div>
    //       <div>Geriatrics Huddle</div>
    //       <div>Leader: {selectedHuddle.leader}</div>
    //       <div>{this.selectedScheduleHuddlePatient.displayReasonText}</div>
    //       {this.renderedSelectedHuddleReviewed()}
    //     </div>
    //   );
    // }
  }

  // renderedSelectedHuddleReviewed() {
  //   if (selectedScheduleHuddlePatient.reviewed) {
  //     return (
  //       <div>
  //         <span>Discussed on {this.selectedScheduleHuddlePatient.reviewed}</span>
  //         <FontAwesome name="times" onclick={this.displayClearDiscussedModal(true)} />
  //       </div>
  //     );
  //   } else {
  //     return <div>Not scheduled</div>;
  //   }
  // }

  render() {
    return (
      <div className="patient-view-stats-huddles">
        <CollapsiblePanel panelTitle="Huddles" panelIcon="users">
          <form className="form-horizontal">
            <div className="add-new-filter-lg">
              <div id="patientViewPikaday">
                <div id="patientViewPikadayCalendar"></div>

                <div className="patient-view-stats-huddles-details">
                  <div className="patient-view-stats-huddles-details-icons">
                    {this.renderedHuddlesDetailsIcons()}
                  </div>

                  <div className="patient-view-stats-huddles-details-date">
                    {moment(this.state.selectedDate).format('MMM D, YYYY')}
                  </div>

                  <div className="patient-view-stats-huddles-details-meta">
                    {this.renderedSelectedHuddleDetails()}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsHuddles.displayName = 'PatientViewStatsHuddles';

PatientViewStatsHuddles.propTypes = {
  selectedHuddle: huddleProps,
  patient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectHuddle: PropTypes.func.isRequired
};
