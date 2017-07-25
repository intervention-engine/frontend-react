import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { pie, arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

export default class PatientViewRiskAsterChartPlot extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeSlice: null,
      tooltipTrigger: null
    };
  }

  getData() {
    let data = [
      { "max_value": 4, "name": "Medications", "value": 3, "weight": 50 },
      { "max_value": 4, "name": "Conditions", "value": 1, "weight": 30 },
      { "max_value": 4, "name": "Allergies", "value": 2, "weight": 10 },
      { "max_value": 4, "name": "Procedures", "value": 3, "weight": 10 },
    ];

    return data;
  }

  handleSliceHover(slice, trigger) {
    this.setState({
      activeSlice: slice,
      tooltipTrigger: trigger
    });
  }

  renderedTooltip() {
    if (!this.state.tooltipTrigger) { return; }

    return (
      <ReactTooltip placement="top" trigger={ this.state.tooltipTrigger }>
        <div>Name: { this.state.activeSlice.data.name }</div>
        <div>Risk : { this.state.activeSlice.data.value }</div>
        <div>Weight: { this.state.activeSlice.data.weight }</div>
      </ReactTooltip>
    );
  }

  renderedChart() {
    let data = this.getData();

    let slices = pie().padAngle(0.03).value((d) => d.weight);
    let radius = arc().innerRadius(200).outerRadius(250).cornerRadius(5);
    let radiusScale = scaleLinear().domain([0,1]).range([75, 175]).clamp(true);
    let innerArc = arc().innerRadius(50).outerRadius((datum) => { return radiusScale(datum.data.value); }).cornerRadius(5);

    return (
      <svg width="100%" height="100%" viewBox="0 0 600 600">
        <g transform="translate(300, 300)" >
          {
            slices(data).map((datum, i) => {
              return (
                <g key={i}>
                  <path id={ datum.data.name }
                        d={ radius(datum) }
                        onMouseEnter={ (e) => this.handleSliceHover(datum, e.target) }
                        onMouseLeave={ () => this.handleSliceHover(null, null) }
                        data-tip={ `${datum.data.name}, ${datum.data.value}, ${datum.data.weight}` } />

                  <path d={ innerArc(datum) }
                        onMouseEnter={ (e) => this.handleSliceHover(datum, e.target) }
                        onMouseLeave={ () => this.handleSliceHover(null, null) }
                        data-tip={ `${datum.data.name}, ${datum.data.value}, ${datum.data.weight}` } />
                </g>
              );
            })
          }
        </g>
      </svg>
    );
  }

  render() {
    return (
      <div className="patient-view-risk-aster-chart-plot">
        { this.renderedTooltip() }
        { this.renderedChart() }
      </div>
    );
  }
}

PatientViewRiskAsterChartPlot.displayName = 'PatientViewRiskAsterChartPlot';

PatientViewRiskAsterChartPlot.propTypes = {

};