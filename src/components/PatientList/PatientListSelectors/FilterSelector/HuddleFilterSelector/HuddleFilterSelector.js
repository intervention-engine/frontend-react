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

  renderedHuddles() {
    if (this.props.huddles) {
      return this.props.huddles.map((huddle) => this.renderedHuddle(huddle));
    }
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

  render() {
    return (
      <div className="huddle-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.renderedHuddles()}
        </form>
      </div>
    );
  }
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleGroupProps),
  selectedHuddleGroup: huddleGroupProps,
  selectedHuddle: huddleProps,
  selectHuddleGroup: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};
