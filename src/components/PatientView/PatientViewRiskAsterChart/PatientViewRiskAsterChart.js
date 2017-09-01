import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import PatientViewRiskAsterChartPlot from './PatientViewRiskAsterChartPlot';

import riskAssessmentBreakdownProps from '../../../prop-types/risk_assessment_breakdown';
import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewRiskAsterChart extends Component {
  render() {
    let date = this.props.selectedRiskAssessment ? this.props.selectedRiskAssessment.date : '';

    return (
      <div className="patient-view-risk-aster-chart">
        <div className="risk-date">{moment(date).format('MMM D, YYYY')}</div>

        <PatientViewRiskAsterChartPlot riskAssessmentBreakdown={this.props.riskAssessmentBreakdown} />
      </div>
    );
  }
}

PatientViewRiskAsterChart.displayName = 'PatientViewRiskAsterChart';

PatientViewRiskAsterChart.propTypes = {
  riskAssessmentBreakdown: PropTypes.arrayOf(riskAssessmentBreakdownProps),
  selectedRiskAssessment: riskAssessmentProps
};
