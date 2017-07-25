import React, { Component } from 'react';
import { pie, arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

export default class PatientViewRiskAsterChartPlot extends Component {
  render() {
    let data = [
      { "max_value": 4, "name": "Medications", "value": 3, "weight": 50 },
      { "max_value": 4, "name": "Conditions", "value": 1, "weight": 30 },
      { "max_value": 4, "name": "Allergies", "value": 2, "weight": 10 },
      { "max_value": 4, "name": "Procedures", "value": 3, "weight": 10 },
    ];

    let slices = pie().padAngle(0.03).value((d) => d.weight);
    let radius = arc().innerRadius(200).outerRadius(250).cornerRadius(5);
    let radiusScale = scaleLinear().domain([0,1]).range([75, 175]).clamp(true);
    let innerArc = arc().innerRadius(50).outerRadius((datum) => { return radiusScale(datum.data.value); }).cornerRadius(5);

    return (
      <div className="patient-view-risk-aster-chart-plot">
        <svg width="60%" height="60%" viewBox="0 0 600 600">
          <g transform="translate(300, 300)" >
            {
              slices(data).map((datum, i) => {
                return (
                  <g key={i}>
                    <path id={datum.name} d={radius(datum)}/>
                    <path d={innerArc(datum)} />
                  </g>
                );
              })
            }
          </g>
        </svg>
      </div>
    );
  }
}

PatientViewRiskAsterChartPlot.displayName = 'PatientViewRiskAsterChartPlot';

PatientViewRiskAsterChartPlot.propTypes = {

};