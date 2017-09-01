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
      activeHoverPoint: null,
      tooltipTrigger: null
    };
  }

  handlePointHover(point, trigger) {
    this.setState({
      activeHoverPoint: point,
      tooltipTrigger: trigger
    });
  }

  handlePointClick(point) {
    let riskAssessment = this.props.riskAssessments.find((ra) => ra.id === point.id);
    this.props.selectRiskAssessment(riskAssessment);
  }

  getData() {
    if (this.props.riskAssessments == null || this.props.riskAssessments.length <= 1) { return null; }

    let sortedRisks = this.props.riskAssessments.sort((a,b) => new Date(a.date) - new Date(b.date));

    let timeScale = scaleTime()
      .domain(extent(this.props.riskAssessments, (riskAssessment) => new Date(riskAssessment.date)))
      .range([1,99]);

    let data = [];
    sortedRisks.forEach((riskAssessment) => {
      data.push({ x: timeScale(new Date(riskAssessment.date)), y: riskAssessment.value, date: riskAssessment.date, id: riskAssessment.id });
    });

    return data;
  }

  renderedTooltip() {
    if (!this.state.tooltipTrigger) { return; }

    return (
      <ReactTooltip placement="top" trigger={ this.state.tooltipTrigger }>
        <div>{ moment(this.state.activeHoverPoint.date).format('MMM D, YYYY') }</div>
        <div>Risk : { this.state.activeHoverPoint.y }</div>
      </ReactTooltip>
    );
  }

  renderedChart() {
    let data = this.getData();

    if (data == null) { return; }

    return (
      <LineChart
        data={ this.getData() }
        activeHoverPoint={ this.state.activeHoverPoint }
        onPointHover={ this.handlePointHover.bind(this) }
        onPointClick={ this.handlePointClick.bind(this) }
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
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps),
  selectRiskAssessment: PropTypes.func.isRequired
};
