import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPopulations, selectPopulation } from '../../../../actions/population';
import CollapsiblePanel from '../../../../elements/CollapsiblePanel';
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

  renderedPopulation(population) {
    return (
      <div key={population.id}>
        <div className="form-group">
          <input type="radio"
            name="population"
            id={`population-radio-${population.id}`}
            value={population.id}
            defaultChecked={this.isSelected(population)}
            className="css-checkbox"
            onChange={() => this.selectPopulation(population)} />

          <label htmlFor={`population-radio-${population.id}`} className="css-label css-label-circle checkbox-label">
            {population.name}
          </label>

          <Link to="/FilterBuilder">
            <FontAwesome name="edit" className="pull-right" />
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="population-filter-selector">
        <CollapsiblePanel panelTitle="Populations">
          <form className="form-horizontal form-group-striped">
            {this.props.populations.map((population) => this.renderedPopulation(population))}

            <div className="add-new-filter">
              <Link to="/FilterBuilder">
                <FontAwesome name="plus-circle" /> add new
              </Link>
            </div>
          </form>
        </CollapsiblePanel>
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
