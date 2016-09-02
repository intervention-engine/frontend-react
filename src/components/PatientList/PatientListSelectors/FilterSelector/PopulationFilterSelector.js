import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPopulations, selectPopulation, unselectPopulation } from '../../../../actions/population';
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
    return this.props.selectedPopulations.indexOf(population) !== -1;
  }

  handleInputChange(population) {
    let found = this.props.selectedPopulations.some((pop) => {
      return pop.id === population.id;
    });

    if (found) {
      this.props.unselectPopulation(population);
    } else {
      this.props.selectPopulation(population);
    }
  }

  renderedPopulation(population) {
    return (
      <div key={population.id} className="population">
        <div className="control-group">
          <label htmlFor={`population-checkbox-${population.id}`} className={`control control-checkbox`}>
            <span className="population-name">{population.name}</span>

            <input type="checkbox"
              name="population"
              id={`population-checkbox-${population.id}`}
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
    if (this.props.selectedPopulations) {
      return this.props.selectedPopulations.map((pop) => pop.name + ', ');
    }
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
    selectedPopulations: state.population.selectedPopulations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPopulations, selectPopulation, unselectPopulation }, dispatch);
}

PopulationFilterSelector.displayName = 'PopulationFilterSelector';

PopulationFilterSelector.propTypes = {
  populations: PropTypes.arrayOf(populationProps).isRequired,
  selectedPopulations: PropTypes.arrayOf(populationProps),
  fetchPopulations: PropTypes.func.isRequired,
  selectPopulation: PropTypes.func.isRequired,
  unselectPopulation: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PopulationFilterSelector);
