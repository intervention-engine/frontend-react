import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import equal from 'deep-equal';
import FontAwesome from 'react-fontawesome';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';
import BootstrapModal from '../../../elements/modals/BootstrapModal';
import AddToHuddleModal from '../../../elements/modals/AddToHuddleModal';
import HuddlePikaday from '../../../elements/pikaday/HuddlePikaday';

import patientHuddles from '../../../utils/patient_huddles';

import huddleProps from '../../../prop-types/huddle';
import patientProps from '../../../prop-types/patient';
import huddleGroupProps from '../../../prop-types/huddle_group';

export default class PatientViewStatsHuddles extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedDate: new Date(),
      showEditHuddleModal: false,
      showPatientReviewedModal: false,
      showAddHuddleModal: false,
      showRemoveDiscussedPatientModal: false,
      patientHuddles: patientHuddles(this.props.patient, this.props.huddles)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(nextProps.patient, this.props.patient) ||
        !equal(nextProps.huddles, this.props.huddles)) {
      this.setState({ patientHuddles: patientHuddles(nextProps.patient, nextProps.huddles) });
    }
  }

  selectedPatientHuddle(selectedDate) {
    if (this.state.patientHuddles == null) { return null; }
    return this.state.patientHuddles.find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));
  }

  renderedHuddlesDetailsIcons() {
    let selectedPatientHuddle = this.selectedPatientHuddle(this.state.selectedDate);

    if (selectedPatientHuddle != null) {
      let patientHuddle = selectedPatientHuddle.patients.find((patient) => patient.id === this.props.patient.id);

      if (patientHuddle.reason.code === 'MANUAL_ADDITION') {
        return <FontAwesome name="edit" onClick={() => this.setState({ showEditHuddleModal: true })} />;
      }

      if (!patientHuddle.reviewed) {
        return <FontAwesome name="check-square-o" onClick={() => this.setState({ showPatientReviewedModal: true })} />;
      }
    } else {
      return <FontAwesome name="plus-circle" onClick={() => this.setState({ showAddHuddleModal: true })} />;
    }
  }

  renderedSelectedHuddleDetails() {
    let selectedPatientHuddle = this.selectedPatientHuddle(this.state.selectedDate);

    if (this.props.selectedHuddle != null) {
      return (
        <div>
          <div>{}</div>
          <div>Leader: {this.props.selectedHuddle.leader}</div>
          <div>{this.selectedPatientHuddle.displayReasonText}</div>
          {this.renderedSelectedHuddleReviewed(selectedPatientHuddle)}
        </div>
      );
    }
  }

  renderedSelectedHuddleReviewed(selectedPatientHuddle) {
    if (selectedPatientHuddle != null && selectedPatientHuddle.reviewed != null) {
      return (
        <div>
          <span>Discussed on {selectedPatientHuddle.reviewed}</span>
          <FontAwesome name="times" onClick={() => this.setState({ showRemoveDiscussedPatientModal: true })} />
        </div>
      );
    } else {
      return <div>Not scheduled</div>;
    }
  }

  selectDate(selectedDate) {
    this.setState({ selectedDate });

    // find and select huddle
    let huddle = this.state.patientHuddles.find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));
    this.props.selectHuddle(huddle);
  }

  render() {
    return (
      <div className="patient-view-stats-huddles">
        <CollapsiblePanel panelTitle="Huddles" panelIcon="users">
          <form className="form-horizontal">
            <div className="pikaday-container">
              <HuddlePikaday selectedDate={this.state.selectedDate}
                             patientHuddles={this.state.patientHuddles}
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
               handleSaveModal={() => null}
               handleHideModal={() => this.setState({ showAddHuddleModal: false })} >
               <AddToHuddleModal patient={this.props.patient}
                                 patientHuddles={this.state.patientHuddles}
                                 selectedDate={this.state.selectedDate} />
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
  selectedHuddle: huddleProps,
  patient: patientProps,
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectHuddle: PropTypes.func.isRequired
};
