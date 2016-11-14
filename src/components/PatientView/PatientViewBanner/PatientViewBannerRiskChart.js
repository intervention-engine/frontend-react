import React from 'react';

import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { area } from 'd3-shape';

const PatientViewBannerRiskChart = ({ riskAssessments, onClickHandler=function(index){}}) => {
  riskAssessments = riskAssessments.sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
  let width = 100.0/riskAssessments.length
  let timeScale = scaleTime()
    .domain(extent(riskAssessments, (r) => new Date(r.datetime)))
    .range([0,100]);
  let riskScale = scaleLinear().domain([4,0]).range([1,19]);
  let areaGenerator = area()
    .x((d) => timeScale(new Date(d.datetime)))
    .y1((d) => riskScale(d.value))
    .y0(100);
  if (riskAssessments.length > 0) {
    return (
      <div>
        <svg viewBox='0 0 100 20' width='100%' height='100%'>
          <path d={areaGenerator(riskAssessments)} />
          {riskAssessments.map((ra, i) =>
            <g onClick={() => onClickHandler(i)} key={i}>
              <circle cx={timeScale(new Date(ra.datetime))} cy={riskScale(ra.value)} r={0.6} />
              <rect y={0} height={20} x={timeScale(new Date(ra.datetime))} width={100-timeScale(new Date(ra.datetime))} opacity={0} stroke='black'/>
            </g>
          )}
        </svg>
      </div>
    )
  }
  return (
    <div>

    </div>
  )
}

export default PatientViewBannerRiskChart;
