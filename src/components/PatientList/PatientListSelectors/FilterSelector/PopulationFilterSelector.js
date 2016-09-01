import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPopulations, selectPopulation } from '../../../../actions/population';
import populationProps from '../../../../prop-types/population';

class PopulationFilterSelector extends Component {
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

  selectPopulation(population) {
    this.props.selectPopulation(population);
  }

  renderedPopulation(type, population) {
    return (
      <div key={population.id} className="population">
        <div className="control-group">
          <label htmlFor={`population-${type}-${population.id}`} className={`control control-${type}`}>
            {population.name}

            <input type={type}
              name="population"
              id={`population-${type}-${population.id}`}
              value={population.id}
              defaultChecked={this.isSelected(population)}
              onChange={() => this.selectPopulation(population)} />

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
          {this.props.populations.map((population) => this.renderedPopulation("radio", population))}

          <div className="add-new-filter">
            <Link to="/FilterBuilder">
              <FontAwesome name="plus-circle" /> add new
            </Link>
          </div>
        </form>

        SELECTED: {this.debugSelected()}
      </div>
    );
  }
}

function mapStateToProps(state) {
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
  fetchPopulations: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PopulationFilterSelector);
