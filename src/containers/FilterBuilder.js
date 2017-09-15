import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { fetchPopulation, savePopulation, getInstaCount } from '../actions/population';

import PageHeader from '../components/Header/PageHeader';
import FilterBuilderComponent from '../components/FilterBuilder/FilterBuilderComponent';

class FilterBuilder extends Component {

  constructor(...args) {
    super(...args);
    if(this.props.params.population_id){
      this.state = this.setStateForEdit(this.props);
    }
    else {
      this.state = this.setStateForCreate();
    }

  }

  setStateForEdit(props) {
    // return props.population;
    return {
      "id": "2805a12a8bd4d4d95e38a43c",
      "name": "Age 65 and under",
      "filters": [
        {
          "filter_type": "age",
          "time_unit": "years",
          "comparator": "between",
          "range": {
            "low": 0,
            "high": 65
          }
        },
        {
          "filter_type": "gender",
          "value": "male"
        },
        {
          "filter_type": "condition",
          "codes": [
            {
              "system": "IDC-9",
              "code": "427.31"
            }
          ]
        },
        {
          "filter_type": "encounter",
          "codes": [
            {
              "system": "IDC-9",
              "code": "427.31"
            }
          ]
        }
      ]
    }
  }

  setStateForCreate() {
    return {
      "id": null,
      "name": "Unnamed Filter",
      "filters": [

      ]
    }
  }

  componentWillMount() {
    if(this.props.params.population_id){
      this.props.fetchPopulation(this.props.params.population_id);
    }
  }

  render() {
    return (
      <div className="filter-builder container">
        <PageHeader title="Filter Builder" />
        <FilterBuilderComponent {...this.state} onFilterChange={this.props.getInstaCount} saveFilter={this.props.savePopulation}/>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPopulation,
    savePopulation,
    getInstaCount
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    population: state.population.populations.find((p) => p.id == this.props.params.population_id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBuilder);
