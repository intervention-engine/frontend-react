import React, { Component, PropTypes } from 'react';

import HuddleFilterDateSelector from './HuddleFilterDateSelector';

import huddleGroupProps from '../../../../../prop-types/huddle_group';
import huddleProps from '../../../../../prop-types/huddle';

export default class HuddleFilterSelector extends Component {
  isSelected(huddleGroup) {
    return this.props.selectedHuddleGroup === huddleGroup;
  }

  handleInputChange(huddleGroup) {
    if (this.props.selectedHuddleGroup === huddleGroup) {
      this.props.selectHuddleGroup(null);
      return;
    }

    this.props.selectHuddleGroup(huddleGroup);
  }

  renderedHuddleDate(huddleGroup) {
    if (!this.isSelected(huddleGroup) || huddleGroup.dates.length === 0) {
      return;
    }

    return (
      <HuddleFilterDateSelector selectedHuddle={this.props.selectedHuddle}
                                selectedHuddleGroup={this.props.selectedHuddleGroup}
                                selectHuddle={this.props.selectHuddle} />
    );
  }

  renderedHuddle(huddleGroup) {
    return (
      <div key={huddleGroup.id} className="huddleGroup">
        <div className="control-group">
          <label htmlFor={`huddleGroup-radio-${huddleGroup.id}`}
                 className={`control control-radio`}>
            <span className="huddleGroup-name">{huddleGroup.name}</span>

            <input type="radio"
                   name="huddleGroup"
                   id={`huddleGroup-radio-${huddleGroup.id}`}
                   value={huddleGroup.id}
                   checked={this.isSelected(huddleGroup)}
                   onChange={() => this.handleInputChange(huddleGroup)} />

            <div className="control-indicator"></div>
          </label>

          {this.renderedHuddleDate(huddleGroup)}
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedHuddleGroup) {
      return (
        <div>
          <div>SELECTED HUDDLE GROUP: {this.props.selectedHuddleGroup.name}</div>
          <div>SELECTED HUDDLE: {this.props.selectedHuddle.datetime}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="huddle-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.huddles.map((huddle) => this.renderedHuddle(huddle))}
        </form>

        {/*<div className="debug">{debugSelected()}</div>*/}
      </div>
    );
  }
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  selectHuddleGroup: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};
