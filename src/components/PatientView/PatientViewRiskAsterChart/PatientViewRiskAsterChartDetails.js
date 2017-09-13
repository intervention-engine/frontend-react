import React, { Component, PropTypes } from 'react';

import HorizontalBarChart from '../../Charts/HorizontalBarChart';

export default class PatientViewRiskAsterChartDetails extends Component {
  renderedDetails() {
    let { slice } = this.props;

    if (slice == null) {
      return (
        <div className="sub-text">
          Select a category to view more details.
        </div>
      );
    } else {
      return (
        <div className="patient-view-risk-aster-chart-details">
          <div className="category-name">
            {slice.data.name}
          </div>

          <div className="category-stat row">
            <div className="category-stat-label col-lg-2 col-md-3 col-xs-3">
              Risk:
            </div>

            <div className="col-lg-2 col-md-3 col-xs-2 category-stat-value">
              {slice.data.value}
            </div>

            <div className="col-lg-8 hidden-md hidden-sm col-xs-7">
              <HorizontalBarChart width={300} height={5} value={slice.data.value} maxValue={slice.data.max_value} />
            </div>

            <div className="col-md-6 col-sm-7 hidden-lg hidden-xs">
              <HorizontalBarChart width={150} height={5} value={slice.data.value} maxValue={slice.data.max_value} />
            </div>
          </div>

          <div className="category-stat row">
            <div className="category-stat-label col-lg-2 col-md-3 col-xs-3">
              Weight:
            </div>

            <div className="col-lg-2 col-md-3 col-xs-2 category-stat-value">
              {slice.data.weight}
            </div>

            <div className="col-lg-8 hidden-md hidden-sm col-xs-7">
              <HorizontalBarChart width={300} height={5} value={slice.data.weight} maxValue={this.props.totalWeight} />
            </div>

            <div className="col-md-6 col-sm-6 hidden-lg hidden-xs">
              <HorizontalBarChart width={150} height={5} value={slice.data.weight} maxValue={this.props.totalWeight} />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="patient-view-risk-aster-chart-details">
        {this.renderedDetails()}
      </div>
    );
  }
}

PatientViewRiskAsterChartDetails.displayName = 'PatientViewRiskAsterChartDetails';

PatientViewRiskAsterChartDetails.propTypes = {
  slice: PropTypes.object,
  totalWeight: PropTypes.number
};