import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import Pikaday from 'pikaday';
import _ from 'lodash';

import huddleProps from '../../../../../prop-types/huddle';

export default class HuddleFilterDateSelector extends Component {
  constructor(...args) {
    super(...args);

    this.state = { dateMap: this.dateMap() };
    this.pikaday = null;
  }

  componentDidMount() {
    let defaultDate = null;
    let setDefaultDate = false;

    if (this.props.selectedHuddle) {
      defaultDate = moment(this.props.selectedHuddle.datetime).toDate();
      setDefaultDate = true;
    }

    this.pikaday = new Pikaday({
      field: this.refs.huddleFilterInput,
      trigger: this.refs.root,
      defaultDate,
      setDefaultDate,
      minDate: this.minDate(),
      maxDate: this.maxDate(),
      disableDayFn: (date) => {
        return this.state.dateMap[moment(date).format('YYYY-MM-DD')] == null;
      },
      onSelect: (date) => {
        this.props.filterPatientsByHuddle(this.state.dateMap[moment(date).format('YYYY-MM-DD')]);
      }
    });
  }

  componentWillUnmount() {
    if (this.pikaday) {
      this.pikaday.destroy();
      this.pikaday = null;
    }
  }

  minDate() {
    let firstHuddle = _.head(_.sortBy(this.props.huddles, 'date'));
    if (firstHuddle) {
      return moment(firstHuddle.date).toDate();
    }
  }

  maxDate() {
    let lastHuddle = _.last(_.sortBy(this.props.huddles, 'date'));
    if (lastHuddle) {
      return moment(lastHuddle.date).toDate();
    }
  }

  dateMap() {
    let huddles = this.props.huddles;
    let map = {};

    for (let i = 0, huddle = huddles[i]; i < huddles.length; huddle = huddles[++i]) {
      map[moment(huddle.date).format('YYYY-MM-DD')] = huddle;
    }

    return map;
  }

  formattedDate(date) {
    return moment(date).format('ddd, MMM Do YYYY');
  }

  render() {
    return (
      <div className="huddle-filter-date-selector" ref="root">
        <span className="huddle-date">
          {this.props.selectedHuddle ? this.formattedDate(this.props.selectedHuddle.date) : 'No Upcoming Huddles'}
        </span>

        <FontAwesome name="chevron-down" />

        <input type="hidden" ref="huddleFilterInput" value="" />
      </div>
    );
  }
}

HuddleFilterDateSelector.displayName = 'HuddleFilterDateSelector';

HuddleFilterDateSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  filterPatientsByHuddle: PropTypes.func.isRequired
};
