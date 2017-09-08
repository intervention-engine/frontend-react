import React, { Component } from 'react';


import { fetchPopulation } from '../actions/population';

import PageHeader from '../components/Header/PageHeader';
import FilterBuilderComponent from '../components/FilterBuilder/FilterBuilderComponent';

class FilterBuilder extends Component {

  constructor(...args) {
    super(...args);
    this.state = this.setStateForEditOrCreate(this.props);
  }

  setStateForEditOrCreate(props) {
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

  componentWillMount() {
    console.log(`Load ${this.props.params.population_id}`);
  }

  render() {
    return (
      <div className="filter-builder container">
        <PageHeader title="Filter Builder" />
        <FilterBuilderComponent {...this.state}/>
      </div>
    );
  }
}


export default FilterBuilder;
