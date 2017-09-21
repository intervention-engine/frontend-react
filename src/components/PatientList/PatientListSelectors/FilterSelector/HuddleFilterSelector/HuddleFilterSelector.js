import React, { Component, PropTypes } from 'react';

import HuddleFilterDateSelector from './HuddleFilterDateSelector';

import huddleProps from '../../../../../prop-types/huddle';
import careTeamProps from '../../../../../prop-types/care_team';

export default class HuddleFilterSelector extends Component {
  isSelected(careTeam) {
    return this.props.selectedCareTeam === careTeam;
  }

  handleInputChange(careTeam) {
    if (this.props.selectedCareTeam === careTeam) {
      this.props.selectCareTeam(null);
      return;
    }

    this.props.selectCareTeam(careTeam);
  }

  renderedHuddleDate(careTeam) {
    // console.debug('!this.isSelected(careTeam): ', !this.isSelected(careTeam));
    // console.debug('!this.props.huddles: ', !this.props.huddles);
    // console.debug('this.props.huddles.length === 0: ', this.props.huddles.length === 0);
    // console.debug('this.props.selectedCareTeam !== careTeam: ', this.props.selectedCareTeam !== careTeam);

    if (!this.props.huddles ||
        this.props.huddles.length === 0 ||
        this.props.selectedCareTeam !== careTeam) {
      return;
    }

    return (
      <HuddleFilterDateSelector huddles={this.props.huddles}
                                selectedHuddle={this.props.selectedHuddle}
                                selectHuddle={this.props.selectHuddle} />
    );
  }

  renderedCareTeams() {
    if (this.props.careTeams) {
      return this.props.careTeams.map((careTeam) => this.renderedCareTeam(careTeam));
    }
  }

  renderedCareTeam(careTeam) {
    return (
      <div key={careTeam.id} className="careTeam">
        <div className="control-group">
          <label htmlFor={`careTeam-radio-${careTeam.id}`}
                 className={`control control-radio`}>
            <span className="careTeam-name">{careTeam.name}</span>

            <input type="radio"
                   name="careTeam"
                   id={`careTeam-radio-${careTeam.id}`}
                   value={careTeam.id}
                   checked={this.isSelected(careTeam)}
                   onChange={() => this.handleInputChange(careTeam)} />

            <div className="control-indicator"></div>
          </label>

          {this.renderedHuddleDate(careTeam)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="huddle-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.renderedCareTeams()}
        </form>
      </div>
    );
  }
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  careTeams: PropTypes.arrayOf(careTeamProps),
  selectedCareTeam: careTeamProps,
  huddles: PropTypes.arrayOf(huddleProps),
  selectedHuddle: huddleProps,
  selectCareTeam: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};
