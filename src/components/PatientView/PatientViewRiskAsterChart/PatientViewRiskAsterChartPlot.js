import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import equal from 'deep-equal';

import AsterPlot from '../../Charts/AsterPlot';
import PatientViewRiskAsterChartDetails from './PatientViewRiskAsterChartDetails';

import riskAssessmentBreakdownProps from '../../../prop-types/risk_assessment_breakdown';

export default class PatientViewRiskAsterChartPlot extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      data: this.props.riskAssessmentBreakdown,
      activeTooltipSlice: null,
      activeSelectedSlice: null,
      tooltipTrigger: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(nextProps.riskAssessmentBreakdown, this.props.riskAssessmentBreakdown)) {
      this.setState({
        data: nextProps.riskAssessmentBreakdown,
        activeSelectedSlice: null
      });
    }
  }

  handleSliceHover(slice, trigger) {
    this.setState({
      activeTooltipSlice: slice,
      tooltipTrigger: trigger
    });
  }

  handleSliceClick(slice) {
    this.setState({
      activeSelectedSlice: slice
    });
  }

  renderedTooltip() {
    if (!this.state.tooltipTrigger || !this.state.activeTooltipSlice) { return; }

    return (
      <ReactTooltip placement="top" trigger={ this.state.tooltipTrigger }>
        <div>Name: { this.state.activeTooltipSlice.data.name }</div>
        <div>Risk : { this.state.activeTooltipSlice.data.value }</div>
        <div>Weight: { this.state.activeTooltipSlice.data.weight }</div>
      </ReactTooltip>
    );
  }

  renderedChart() {
    if (this.state.data == null) { return; }

    return (
      <AsterPlot
        data={ this.state.data }
        activeSlice={ this.state.activeTooltipSlice }
        onSliceHover={ this.handleSliceHover.bind(this) }
        onSliceClick={ this.handleSliceClick.bind(this) }
      />
    );
  }

  render() {
    if (this.state.data === null) { return <div></div>; }

    let totalWeight = this.state.data.reduce((sum, slice) => sum + slice.weight, 0);

    return (
      <div className="patient-view-risk-aster-chart-plot">
        { this.renderedTooltip() }
        { this.renderedChart() }

        <PatientViewRiskAsterChartDetails slice={this.state.activeSelectedSlice}
                                          totalWeight={totalWeight} />
      </div>
    );
  }
}

PatientViewRiskAsterChartPlot.displayName = 'PatientViewRiskAsterChartPlot';

PatientViewRiskAsterChartPlot.propTypes = {
  riskAssessmentBreakdown: PropTypes.arrayOf(riskAssessmentBreakdownProps)
};