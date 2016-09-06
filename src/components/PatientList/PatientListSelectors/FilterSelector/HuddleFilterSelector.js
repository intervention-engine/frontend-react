import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import huddleProps from '../../../../prop-types/huddle';
import {
  fetchHuddles,
  selectHuddle,
  unselectHuddle
} from '../../../../actions/huddle';

export class HuddleFilterSelector extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentWillMount(){
    this.props.fetchHuddles();
  }

  isSelected(huddle) {
    return this.props.selectedHuddles.indexOf(huddle) !== -1;
  }

  handleInputChange(huddle) {
    let found = this.props.selectedHuddles.some((hud) => {
      return hud.id === huddle.id;
    });

    if (found) { this.props.unselectHuddle(huddle); }
    else { this.props.selectHuddle(huddle); }
  }

  renderedHuddle(huddle) {
    return (
      <div key={huddle.name} className="huddle">
        <div className="control-group">
          <label htmlFor={`huddle-checkbox-${huddle.name}`} className={`control control-checkbox`}>
            <span className="huddle-name">{huddle.datetime}</span>

            <input type="checkbox"
              name="huddle"
              id={`huddle-checkbox-${huddle.name}`}
              value={huddle.name}
              checked={this.isSelected(huddle)}
              onChange={() => this.handleInputChange(huddle)} />

            <div className="control-indicator"></div>
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    console.debug("HUDDLES: ", this.props.huddles);

    if (this.props.selectedHuddles) {
      return this.props.selectedHuddles.map((hud) => hud.name + ', ');
    }
  }

  render() {
    return (
      <div className="population-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.huddles.map((huddle) => this.renderedHuddle(huddle))}
        </form>

        <div className="debug">SELECTED: {this.debugSelected()}</div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    huddles: state.huddle.huddles,
    selectedHuddles: state.huddle.selectedHuddles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHuddles,
    selectHuddle,
    unselectHuddle
  }, dispatch);
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleProps).isRequired,
  selectedHuddles: PropTypes.arrayOf(huddleProps),
  fetchHuddles: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired,
  unselectHuddle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HuddleFilterSelector);
