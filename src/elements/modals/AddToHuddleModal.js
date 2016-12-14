import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import HuddlePikaday from '../pikaday/HuddlePikaday';

import patientProps from '../../prop-types/patient';

export default class AddToHuddleModal extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedDate: this.props.selectedDate,
      selectedPatientHuddle: this.findPatientHuddle(this.props.selectedDate),
      addToHuddleReason: ''
    };
  }

  findPatientHuddle(selectedDate) {
    if (this.props.patientHuddles == null) { return null; }
    return this.props.patientHuddles.find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));
  }

  saveForm() {
    return;
  }

  updateHuddleReason(event) {
    this.setState({ huddleReason: event.target.value });
  }

  selectDate(selectedDate) {
    this.setState({
      selectedDate,
      selectedPatientHuddle: this.findPatientHuddle(selectedDate)
    });
  }

  render() {
    return (
      <form onSubmit={() => this.saveForm()}>
        <div className="modal-body add-to-huddle-modal-body">
          <div id="addToHuddlePikaday" className="form-group row">
            <div className="col-sm-4">
              <label htmlFor="huddleDate">Huddle Date:</label>
            </div>

            <div className="col-sm-8" id="huddleDate">
              <div className="input-addon left-addon">
                <FontAwesome name="calendar-o" className="left-addon-icon" fixedWidth={true} />
                <HuddlePikaday selectedDate={this.state.selectedDate}
                               patientHuddles={this.props.patientHuddles}
                               input={true}
                               inputClassName="form-control form-input"
                               onSelect={this.selectDate.bind(this)} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-4">
                <label htmlFor="huddleReason">Reason:</label>
              </div>

              <div className="col-sm-8">
                <textarea rows="3"
                          id="huddleReason"
                          value={this.state.addToHuddleReason}
                          disabled={false}
                          onChange={this.updateHuddleReason.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

AddToHuddleModal.displayName = 'AddToHuddleModal';

AddToHuddleModal.propTypes = {
  patient: patientProps,
  patientHuddles: PropTypes.array,
  selectedDate: PropTypes.object,
};
