import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import equal from 'deep-equal';
import FontAwesome from 'react-fontawesome';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';
import BootstrapModal from '../../../elements/modals/BootstrapModal';
import AddToHuddleModal from '../../../elements/modals/AddToHuddleModal';
import HuddlePikaday from '../../../elements/pikaday/HuddlePikaday';

// import getPatientHuddles from '../../../utils/get_patient_huddles';

import careTeamProps from '../../../propTypes/care_team';
import huddleProps from '../../../prop-types/huddle';
import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';

export default class PatientViewStatsHuddles extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      patientHuddles: [],                       // array of all huddles the patient is in
      selectedDate: new Date(),                 // date selected on huddle calendar
      selectedPatientHuddle: null,              // patient huddle for selected day
      selectedPatientHuddlePatientInfo: null,   // patient info for selected patient huddle
      showEditHuddleModal: false,
      showPatientReviewedModal: false,
      showAddHuddleModal: false,
      showRemoveDiscussedPatientModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(nextProps.patient, this.props.patient) ||
        !equal(nextProps.huddles, this.props.huddles)) {
      this.updateHuddles(nextProps.patient, nextProps.huddles, this.state.selectedDate);
    }
  }

  // used in componentWillReceiveProps to update patientHuddles, selectedPatientHuddle,
  // and selectedPatientHuddlePatientInfo state
  updateHuddles(patient, huddles, selectedDate) {
    `This function is currently disabled, updateHuddles(${patient}, ${huddles}, ${selectedDate});`;
    return;
    // let patientHuddles = getPatientHuddles(patient, huddles);
    //
    // let selectedPatientHuddle;
    // if (patientHuddles != null) {
    //   selectedPatientHuddle = this.selectedPatientHuddle(selectedDate, patientHuddles);
    // }
    //
    // let selectedPatientHuddlePatientInfo;
    // if (selectedPatientHuddle != null) {
    //   selectedPatientHuddlePatientInfo = selectedPatientHuddle.patients.find((patient) => patient.id === this.props.patient.id);
    // }
    //
    // this.setState({ patientHuddles, selectedPatientHuddle, selectedPatientHuddlePatientInfo });
  }

  // used in updateHuddles to select huddle for patient on the given selected date
  selectedPatientHuddle(selectedDate, patientHuddles) {
    if (patientHuddles == null) { return null; }
    return patientHuddles.find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));
  }

  renderedHuddlesDetailsIcons() {
    if (this.state.selectedPatientHuddle != null) { // patient has a huddle on the selected date
      if (this.state.selectedPatientHuddlePatientInfo.reason.code === 'MANUAL_ADDITION') {
        return <FontAwesome name="edit" onClick={() => this.setState({ showEditHuddleModal: true })} />;
      }

      if (!this.state.selectedPatientHuddlePatientInfo.reviewed) {
        return <FontAwesome name="check-square-o" onClick={() => this.setState({ showPatientReviewedModal: true })} />;
      }
    } else { // patient does not have a huddle on the selected date
      return <FontAwesome name="plus-circle" onClick={() => this.setState({ showAddHuddleModal: true })} />;
    }
  }

  renderedSelectedHuddleDetails() {
    if (this.state.selectedPatientHuddle != null && this.state.selectedPatientHuddlePatientInfo != null) {
      return (
        <div className="small">
          <div>{this.state.selectedPatientHuddle.name}</div>
          <div>{this.state.selectedPatientHuddlePatientInfo.reason.text}</div>
          {this.renderedSelectedHuddleReviewed(this.state.selectedPatientHuddlePatientInfo)}
        </div>
      );
    } else {
      return <div className="small">Not scheduled</div>;
    }
  }

  renderedSelectedHuddleReviewed(selectedPatientHuddlePatientInfo) {
    if (selectedPatientHuddlePatientInfo != null && selectedPatientHuddlePatientInfo.reviewed != null) {
      return (
        <div>
          <span>Discussed on {moment(selectedPatientHuddlePatientInfo.reviewed).format('MMM D, YYYY')} </span>
          <FontAwesome name="times" onClick={() => this.setState({ showRemoveDiscussedPatientModal: true })} />
        </div>
      );
    }
  }

  selectDate(selectedDate) {
    this.setState({ selectedDate });
    this.updateHuddles(this.props.patient, this.props.huddles, selectedDate);
    this.props.selectHuddle(this.selectedPatientHuddle(selectedDate));
  }

  renderedCareTeams() {
    if (this.props.careTeams == null) { return; }

    return this.props.careTeams.map((careTeam) => {
      return (
        <div key={careTeam.id} className="care-team control-group">
          <label htmlFor={`care-team-radio-${careTeam.id}`} className={`control control-radio`}>
            <span className="care-team-name">{careTeam.name}</span>

            <input type="radio"
              name="careTeam"
              id={`care-team-radio-${careTeam.id}`}
              value={careTeam.id}
              checked={this.isSelected(careTeam)}
              onChange={() => this.handleInputChange(careTeam)} />

            <div className="control-indicator"></div>
          </label>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="patient-view-stats-huddles">
        <CollapsiblePanel panelTitle="Huddles" panelIcon="users">
          <form className="form-horizontal">
            {this.renderedCareTeams()}

            <div className="pikaday-container">
              <HuddlePikaday selectedDate={this.state.selectedDate}
                             patientHuddles={this.state.patientHuddles}
                             patient={this.props.patient}
                             onSelect={this.selectDate.bind(this)} />
            </div>

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
          </form>
        </CollapsiblePanel>

        <BootstrapModal title="Edit Huddle"
               handleShowModal={this.state.showEditHuddleModal}
               handleSaveModal={() => null}
               handleHideModal={() => this.setState({ showEditHuddleModal: false })} >
               <div>Test Modal Body</div>
        </BootstrapModal>

        <BootstrapModal title="Mark Patient As Reviewed"
               handleShowModal={this.state.showPatientReviewedModal}
               handleSaveModal={() => null}
               handleHideModal={() => this.setState({ showPatientReviewedModal: false })} >
               <div>Test Modal Body</div>
        </BootstrapModal>

        <BootstrapModal title="Add to Huddle"
               handleShowModal={this.state.showAddHuddleModal}
               handleSaveModal={() => this.refs.addHuddleModal.saveForm()}
               handleHideModal={() => this.setState({ showAddHuddleModal: false })} >
               <AddToHuddleModal patient={this.props.patient}
                                 huddles={this.props.huddles}
                                 selectedDate={this.state.selectedDate}
                                 addPatientToHuddle={this.props.addPatientToHuddle}
                                 ref="addHuddleModal" />
        </BootstrapModal>

        <BootstrapModal title="Remove Discussed Patient"
               handleShowModal={this.state.showRemoveDiscussedPatientModal}
               handleSaveModal={() => null}
               handleHideModal={() => this.setState({ showRemoveDiscussedPatientModal: false })} >
               <div>Test Modal Body</div>
        </BootstrapModal>
      </div>
    );
  }
}

PatientViewStatsHuddles.displayName = 'PatientViewStatsHuddles';

PatientViewStatsHuddles.propTypes = {
  patient: patientProps,
  careTeams: careTeamProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddle: huddleProps,
  selectHuddle: PropTypes.func.isRequired,
  addPatientToHuddle: PropTypes.func.isRequired
};
