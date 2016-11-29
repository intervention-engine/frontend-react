import React from 'react';

import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { area, line } from 'd3-shape';
import { voronoi } from 'd3-voronoi';

const PatientViewBannerRiskChart = ({ riskAssessments, onClickHandler=function(index){console.log(index);}}) => {
  if (riskAssessments) {
    console.log(riskAssessments);
    riskAssessments = riskAssessments.sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
    let timeScale = scaleTime()
      .domain(extent(riskAssessments, (r) => new Date(r.datetime)))
      .range([0,100]);
    let riskScale = scaleLinear().domain([4,0]).range([1,19]);
    let areaGenerator = area().y0(100);
    // Define a function to project the riskAssessments into the svg's coordinate system
    // This will make building diagram easier
    // Note ,if you need more data from the riskAssessments the indexes line up
    let projection = (d) => [timeScale(new Date(d.datetime)), riskScale(d.value)];
    let hitTargets = voronoi().extent([[-1, -1], [101, 21]]);


    let projectedData = riskAssessments.map(projection);
    let hitTargetPolys = hitTargets.polygons(projectedData);
    return (
      <div className='patient-risk-chart'>
        <svg viewBox='0 0 100 20' width='100%' height='100%'>
          <path d={areaGenerator(projectedData)} className='path'/>
          {projectedData.map((ra, i) =>
            <g key={i}>
              <circle cx={ra[0]} cy={ra[1]} r={0.6} className='data-point'/>
              <path d={line()(hitTargetPolys[i])} opacity={0} onClick={() => onClickHandler(i)} className='click-target'/>
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
