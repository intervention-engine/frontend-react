import React, { Component, PropTypes } from "react";
import { pie, arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import equal from 'deep-equal';

export default class AsterPlot extends Component {
  constructor(props) {
    super(props);

    let slices = pie().padAngle(0.03).value((d) => d.weight);

    this.state = {
      activeSlice: null,
      slices,
      dataSlices: slices(props.data),
      maxValue: props.data[0].max_value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(nextProps.data, this.props.data)) {
      this.setState({
        dataSlices: this.state.slices(nextProps.data),
        maxValue: nextProps.data[0].max_value
      });
    }
  }

  isActiveSlice(slice) {
    if (this.state.activeSlice == null) { return false; }

    return slice === this.state.activeSlice;
  }

  handleSliceClick(slice, trigger) {
    let _slice = slice;

    if (this.isActiveSlice(slice)) {
      _slice = null;
    }

    this.setState({
      activeSlice: _slice
    });

    this.props.onSliceClick(_slice, trigger);
  }

  render() {
    let { viewBoxWidth, viewBoxHeight } = this.props;
    let { maxValue, dataSlices } = this.state;

    let outerArc = arc().innerRadius(200)
                        .outerRadius(250)
                        .cornerRadius(5);

    let innerArcScale = scaleLinear().domain([0, maxValue]).range([75,175]).clamp(true);
    let innerArc = arc().innerRadius(50)
                        .outerRadius((d) => innerArcScale(d.data.value))
                        .cornerRadius(5);

    let opacityScale = scaleLinear().domain([0, maxValue]).range([0.4, 1]);

    return (
      <svg className="aster-plot" width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        <g transform="translate(300, 300)">
          {
            dataSlices.map((slice, i) => {
              return (
                <g key={i}
                   fillOpacity={opacityScale(slice.data.value)}
                   stroke={this.isActiveSlice(slice) ? "black" : ""}
                   strokeWidth="5">
                  <path id={ slice.data.name }
                        d={ outerArc(slice) }
                        onMouseEnter={ (e) => this.props.onSliceHover(slice, e.target) }
                        onMouseLeave={ () => this.props.onSliceHover(null, null) }
                        onClick={ (e) => this.handleSliceClick(slice, e.target) }
                        data-tip={ `${slice.data.name}, ${slice.data.value}, ${slice.data.weight}` } />

                  <path d={ innerArc(slice) }
                        onMouseEnter={ (e) => this.props.onSliceHover(slice, e.target) }
                        onMouseLeave={ () => this.props.onSliceHover(null, null) }
                        onClick={ (e) => this.handleSliceClick(slice, e.target) }
                        data-tip={ `${slice.data.name}, ${slice.data.value}, ${slice.data.weight}` } />
                </g>
              );
            })
          }
        </g>
      </svg>
    );
  }
}

AsterPlot.propTypes = {
  activeSlice: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    weight: PropTypes.number,
    max_value: PropTypes.number
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    weight: PropTypes.number,
    max_value: PropTypes.number
  })).isRequired,
  onSliceHover: PropTypes.func,
  onSliceClick: PropTypes.func,
  viewBoxHeight: PropTypes.number,
  viewBoxWidth: PropTypes.number
};

AsterPlot.defaultProps = {
  activeSlice: {
    name: null,
    value: null,
    weight: null,
    max_value: null
  },
  data: [],
  onSliceHover: () => {},
  onSliceClick: () => {},
  viewBoxHeight: 600,
  viewBoxWidth: 650
};