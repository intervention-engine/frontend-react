import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import Pikaday from 'pikaday';
import _ from 'lodash';

import huddleGroupProps from '../../../../../prop-types/huddle_group';
import huddleProps from '../../../../../prop-types/huddle';
import { selectHuddle } from '../../../../../actions/huddle';

export class HuddleFilterDateSelector extends Component {
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
        this.props.selectHuddle(this.state.dateMap[moment(date).format('YYYY-MM-DD')]);
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
    let huddle = _.head(_.sortBy(this.props.selectedHuddleGroup.dates, 'datetime'));
    if (huddle) {
      return moment(huddle.datetime).toDate();
    }
  }

  maxDate() {
    let huddle = _.last(_.sortBy(this.props.selectedHuddleGroup.dates, 'datetime'));
    if (huddle) {
      return moment(huddle.datetime).toDate();
    }
  }

  dateMap() {
    let huddles = this.props.selectedHuddleGroup.dates;
    let map = {};

    for (let i = 0, huddle = huddles[i]; i < huddles.length; huddle = huddles[++i]) {
      map[moment(huddle.datetime).format('YYYY-MM-DD')] = huddle;
    }
    return map;
  }

  formattedDate(datetime) {
    return moment(datetime).format('ddd, MMM Do YYYY');
  }

  render() {
    return (
      <div className="huddle-filter-date-selector" ref="root">
        <span className="huddle-date">
          {this.props.selectedHuddle ? this.formattedDate(this.props.selectedHuddle.datetime) : 'No Upcoming Huddles'}
        </span>

        <FontAwesome name="chevron-down" />

        <input type="hidden" ref="huddleFilterInput" value="" />
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    huddles: state.huddle.huddles,
    selectedHuddleGroup: state.huddle.selectedHuddleGroup,
    selectedHuddle: state.huddle.selectedHuddle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectHuddle }, dispatch);
}

HuddleFilterDateSelector.displayName = 'HuddleFilterDateSelector';

HuddleFilterDateSelector.propTypes = {
  selectedHuddleGroup: huddleGroupProps.isRequired,
  selectedHuddle: huddleProps,
  selectHuddle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HuddleFilterDateSelector);
