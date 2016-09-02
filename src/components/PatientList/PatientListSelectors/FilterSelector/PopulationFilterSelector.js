import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPopulations, selectPopulation } from '../../../../actions/population';
import populationProps from '../../../../prop-types/population';

export class PopulationFilterSelector extends Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentWillMount(){
    this.props.fetchPopulations();
  }

  isSelected(population) {
    return this.props.selectedPopulation === population;
  }

  handleInputChange(population) {
    if (this.props.selectedPopulation === population) {
      this.props.selectPopulation(null);
    } else {
      this.props.selectPopulation(population);
    }
  }

  renderedPopulation(population) {
    return (
      <div key={population.id} className="population">
        <div className="control-group">
          <label htmlFor={`population-radio-${population.id}`} className={`control control-radio`}>
            <span className="population-name">{population.name}</span>

            <input type="radio"
              name="population"
              id={`population-radio-${population.id}`}
              value={population.id}
              checked={this.isSelected(population)}
              onChange={() => this.handleInputChange(population)} />

            <div className="control-indicator"></div>

            <Link to="/FilterBuilder">
              <FontAwesome name="edit" className="pull-right" />
            </Link>
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedPopulation) { return this.props.selectedPopulation.name; }
  }

  render() {
    return (
      <div className="population-filter-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.populations.map((population) => this.renderedPopulation(population))}

          <div className="add-new-filter">
            <Link to="/FilterBuilder">
              <FontAwesome name="plus-circle" /> add new
            </Link>
          </div>
        </form>

        <div className="debug">SELECTED: {this.debugSelected()}</div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    populations: state.population.populations,
    selectedPopulation: state.population.selectedPopulation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPopulations, selectPopulation }, dispatch);
}

PopulationFilterSelector.displayName = 'PopulationFilterSelector';

PopulationFilterSelector.propTypes = {
  populations: PropTypes.arrayOf(populationProps).isRequired,
  selectedPopulation: populationProps,
  fetchPopulations: PropTypes.func.isRequired,
  selectPopulation: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PopulationFilterSelector);
