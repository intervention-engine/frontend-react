import React, { Component, PropTypes } from "react";
import { scaleLinear } from 'd3-scale';

export default class HorizontalBarChart extends Component {
  render() {
    let { width, height, value, maxValue, fillColor, widthColor } = this.props;
    let widthScale = scaleLinear().domain([0, maxValue]).range([0, width]);

    return (
      <svg className="horizontal-bar-chart" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g>
          <rect width={widthScale(value)} height={height} x={0} y={0} fill={fillColor} />
          <rect width={width-widthScale(value)} height={height} x={widthScale(value)} y={0} fill={widthColor} />
        </g>
      </svg>
    );
  }
}

HorizontalBarChart.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.number,
  maxValue: PropTypes.number,
  fillColor: PropTypes.string,
  widthColor: PropTypes.string
};

HorizontalBarChart.defaultProps = {
  width: 300,
  height: 5,
  value: 0,
  maxValue: 0,
  fillColor: '#5D8FAE',
  widthColor: '#EEEEEE'
};