import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { scaleTime } from 'd3-scale';
import { extent } from 'd3-array';

import LineChart from '../../Charts/LineChart';

import riskAssessmentProps from '../../../prop-types/risk_assessment';

export default class PatientViewBannerRiskChart extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activePoint: null,
      tooltipTrigger: null
    };
  }

  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger
    });
  }

  getData() {
    if (this.props.riskAssessments == null || this.props.riskAssessments.length <= 1) { return null; }

    let sortedRisks = this.props.riskAssessments.sort((a,b) => new Date(a.date) - new Date(b.date));

    let timeScale = scaleTime()
      .domain(extent(this.props.riskAssessments, (riskAssessment) => new Date(riskAssessment.date)))
      .range([1,99]);

    let data = [];
    sortedRisks.forEach((riskAssessment) => {
      data.push({ x: timeScale(new Date(riskAssessment.date)), y: riskAssessment.value, date: riskAssessment.date });
    });

    return data;
  }

  renderedTooltip() {
    if (!this.state.tooltipTrigger) { return; }

    return (
      <ReactTooltip placement="top" trigger={ this.state.tooltipTrigger }>
        <div>{ moment(this.state.activePoint.date).format('MMM D, YYYY') }</div>
        <div>Risk : { this.state.activePoint.y }</div>
      </ReactTooltip>
    );
  }

  renderedChart() {
    let data = this.getData();

    if (data == null) { return; }

    return (
      <LineChart
        data={ this.getData() }
        activePoint={ this.state.activePoint }
        onPointHover={ this.handlePointHover.bind(this) }
      />
    );
  }

  render() {
    return (
      <div className="patient-view-banner-risk-chart">
        { this.renderedTooltip() }
        { this.renderedChart() }
      </div>
    );
  }
}

PatientViewBannerRiskChart.displayName = 'PatientViewBannerRiskChart';

PatientViewBannerRiskChart.propTypes = {
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps)
};
