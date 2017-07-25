import React, { Component } from 'react';

import PatientViewRiskAsterChartPlot from './PatientViewRiskAsterChartPlot';
import PatientViewRiskAsterChartDetails from './PatientViewRiskAsterChartDetails';

export default class PatientViewRiskAsterChart extends Component {
  render() {
    return (
      <div className="patient-view-risk-aster-chart">
        <PatientViewRiskAsterChartPlot />
        <PatientViewRiskAsterChartDetails />
      </div>
    );
  }
}

PatientViewRiskAsterChart.displayName = 'PatientViewRiskAsterChart';

PatientViewRiskAsterChart.propTypes = {

};
