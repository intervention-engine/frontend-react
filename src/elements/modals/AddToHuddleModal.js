import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import HuddlePikaday from '../pikaday/HuddlePikaday';

import getPatientHuddles from '../../utils/get_patient_huddles';

import patientProps from '../../prop-types/patient';
import huddleProps from '../../prop-types/huddle';

export default class AddToHuddleModal extends Component {
  constructor(...args) {
    super(...args);

    let [ selectedHuddleGroup ] = this.props.huddles;
    let patientHuddles = getPatientHuddles(this.props.patient, [selectedHuddleGroup]);

    this.state = {
      selectedHuddleGroup,
      selectedHuddleGroupId: selectedHuddleGroup.id,
      selectedDate: this.props.selectedDate,
      huddleReason: '',
      patientHuddles
    };
  }

  // findPatientHuddle(selectedDate) {
  //   if (this.props.patientHuddles == null) { return null; }
  //   return this.props.patientHuddles.find((huddle) => moment(selectedDate).isSame(huddle.datetime, 'day'));
  // }

  saveForm() {
    this.props.addPatientToHuddle({
      patient: this.props.patient,
      huddleGroup: this.state.selectedHuddleGroup,
      date: moment(this.state.selectedDate).format('YYYY-MM-DD'),
      reason: this.state.huddleReason
    });
    return;
  }

  updateHuddleReason(event) {
    this.setState({ huddleReason: event.target.value });
  }

  selectHuddleGroup(event) {
    let selectedHuddleGroupId = event.target.value;
    let selectedHuddleGroup = this.props.huddles.find((huddleGroup) => huddleGroup.id === selectedHuddleGroupId);

    this.setState({
      selectedHuddleGroupId,
      selectedHuddleGroup,
      patientHuddles: getPatientHuddles(this.props.patient, [selectedHuddleGroup])
    });
  }

  selectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  render() {
    return (
      <form className="add-to-huddle-modal" onSubmit={() => this.saveForm()}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-4">
              <label htmlFor="">Huddle Group:</label>
            </div>
            <div className="col-sm-8">
              <select value={this.state.selectedHuddleGroupId} onChange={this.selectHuddleGroup.bind(this)}>
                {this.props.huddles.map((huddleGroup) =>
                  <option key={huddleGroup.id} value={huddleGroup.id}>{huddleGroup.name}</option>
                )}
              </select>
            </div>
          </div>

          <div id="addToHuddlePikaday" className="form-group row">
            <div className="col-sm-4">
              <label htmlFor="huddleDate">Huddle Date:</label>
            </div>

            <div className="col-sm-8" id="huddleDate">
              <div className="input-addon left-addon">
                <FontAwesome name="calendar-o" className="left-addon-icon" fixedWidth={true} />
                <HuddlePikaday selectedDate={this.state.selectedDate}
                               huddles={this.state.selectedHuddleGroup.dates}
                               patientHuddles={this.state.patientHuddles}
                               input={true}
                               inputClassName="form-control form-input"
                               onSelect={this.selectDate.bind(this)} />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-4">
              <label htmlFor="huddleReason">Reason:</label>
            </div>

            <div className="col-sm-8">
              <textarea rows="3"
                        id="huddleReason"
                        value={this.state.huddleReason}
                        disabled={false}
                        onChange={this.updateHuddleReason.bind(this)} />
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
  huddles: PropTypes.arrayOf(huddleProps),
  selectedDate: PropTypes.object,
  addPatientToHuddle: PropTypes.func.isRequired
};
