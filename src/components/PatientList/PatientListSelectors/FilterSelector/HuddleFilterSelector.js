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
    return this.props.selectedHuddle === huddle;
  }

  handleInputChange(huddle) {
    if (this.props.selectedHuddle === huddle) {
      this.props.selectHuddle(null);
      return;
    }
    this.props.selectHuddle(huddle);
  }

  renderedHuddle(huddle) {
    return (
      <div key={huddle.id} className="huddle">
        <div className="control-group">
          <label htmlFor={`huddle-radio-${huddle.id}`} className={`control control-radio`}>
            <span className="huddle-id">{huddle.name}</span>

            <input type="radio"
              name="huddle"
              id={`huddle-radio-${huddle.id}`}
              value={huddle.id}
              checked={this.isSelected(huddle)}
              onChange={() => this.handleInputChange(huddle)} />

            <div className="control-indicator"></div>
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedHuddle) {
      return this.props.selectedHuddle.name;
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
    selectedHuddle: state.huddle.selectedHuddle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHuddles,
    selectHuddle
  }, dispatch);
}

HuddleFilterSelector.displayName = 'HuddleFilterSelector';

HuddleFilterSelector.propTypes = {
  huddles: PropTypes.arrayOf(huddleProps).isRequired,
  selectedHuddle: huddleProps,
  fetchHuddles: PropTypes.func.isRequired,
  selectHuddle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HuddleFilterSelector);
