import React, { Component, PropTypes } from 'react';
import Pikaday from 'pikaday';
import moment from 'moment';
import _ from 'lodash';

import Stylesheet from '../../utils/stylesheet';

import huddleProps from '../../prop-types/huddle';
import patientProps from '../../prop-types/patient';

export default class HuddlePikaday extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedDate: moment(this.props.selectedDate),
      uniqueId: _.uniqueId('huddle-pikaday-')
    };

    this.stylesheet = null;
  }

  componentDidMount() {
    let pickerOptions = {
      defaultDate: this.state.selectedDate.toDate(),
      setDefaultDate: true,
      format: 'dddd, MMMM Do YYYY',
      value: this.state.selectedDate,
      firstDay: 0,
      theme: this.state.uniqueId,
      onSelect: (selectedDate) => {
        if (this.props.onSelect) {
          this.props.onSelect(selectedDate);
        }
      }
    };

    if (this.refs.pikadayInput) {
      pickerOptions.field = this.refs.pikadayInput;
    }

    this.picker = new Pikaday(pickerOptions);

    // TODO: remove when this PR is merged in and released: https://github.com/dbushell/Pikaday/pull/610
    // this disables the right and left arrows moving the date (which prevents use in search input fields)
    document.removeEventListener('keydown', this.picker._onKeyChange);

    if (this.refs.pikadayContainer) {
      this.refs.pikadayContainer.appendChild(this.picker.el);
    }
  }

  componentDidUpdate() {
    this.setPikadayStyles();
  }

  componentWillUnmount() {
    if (this.picker) {
      this.picker.destroy();
      this.picker = null;
    }

    if (this.stylesheet) {
      this.stylesheet.remove();
      this.stylesheet = null;
    }
  }

  setPikadayStyles() {
    if (this.props.patientHuddles == null) { return; }
    if (this.stylesheet) { this.stylesheet.remove(); }

    this.stylesheet = new Stylesheet();

    let patientHuddles = this.props.patientHuddles;
    for (let i = 0; i < patientHuddles.length; i++) {
      let date = moment(patientHuddles[i].datetime);
      let year = date.year();
      let month = date.month();
      let day = date.date();

      let backgroundColor = '#5D8FAE';
      let boxShadow = '#53809c';

      if (this.props.patient) {
        let huddlePatient = patientHuddles[i].patients.find((patient) => patient.id === this.props.patient.id);
        if (huddlePatient && huddlePatient.reviewed) {
          backgroundColor = '#5C5C5C';
          boxShadow = '#525252';
        }
      }

      let cssRule = `background-color: ${backgroundColor};
                     color: #fff;
                     border-radius: 3px;
                     box-shadow: inset 0 1px 3px ${boxShadow};`;
      this.stylesheet.addRule(`.${this.state.uniqueId} [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, cssRule);
    }

    let huddles = this.props.huddles;
    if (huddles != null) {
      let huddleDates = huddles.map((huddle) => moment(huddle.datetime).format('YYYY-MM-DD'));

      for (let i = 0; i < huddleDates.length; ++i) {
        let huddleDate = moment(huddleDates[i]);
        let year = huddleDate.year();
        let month = huddleDate.month();
        let day = huddleDate.date();

        let cssRule = `border: 1px dashed #5D8FAE;
                       border-radius: 3px;`;

        this.stylesheet.addRule(`.${this.state.uniqueId} [data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`, cssRule);
      }
    }
  }

  render() {
    if (this.props.input) {
      return (
        <input type="text" ref="pikadayInput" className={this.props.inputClassName} />
      );
    } else {
      return (
        <div ref="pikadayContainer"></div>
      );
    }
  }
}

HuddlePikaday.displayName = 'HuddlePikaday';

HuddlePikaday.propTypes = {
  selectedDate: PropTypes.object,
  patient: patientProps,
  patientHuddles: PropTypes.array,
  huddles: PropTypes.arrayOf(huddleProps),
  input: PropTypes.bool,
  inputClassName: PropTypes.string,
  onSelect: PropTypes.func
};
