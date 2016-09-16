import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import riskAssessmentProps from '../../../prop-types/risk_assessment';

import {
  fetchRiskAssessments,
  selectRiskAssessment
} from '../../../actions/risk_assessment';

export class RiskAssessmentSelector extends Component {
  componentWillMount(){
    this.props.fetchRiskAssessments();
  }

  isSelected(riskAssessment) {
    return this.props.selectedRiskAssessment === riskAssessment;
  }

  handleInputChange(riskAssessment) {
    if (this.props.selectedRiskAssessment === riskAssessment) {
      this.props.selectRiskAssessment(null);
      return;
    }

    this.props.selectRiskAssessment(riskAssessment);
  }

  renderedRiskAssessment(riskAssessment) {
    return (
      <div key={riskAssessment.id} className="risk-assessment-group">
        <div className="control-group">
          <label htmlFor={`risk-assessment-radio-${riskAssessment.id}`} className={`control control-radio`}>
            <span className="risk-assessment-name">{riskAssessment.name}</span>

            <input type="radio"
              name="riskAssessment"
              id={`risk-assessment-radio-${riskAssessment.id}`}
              value={riskAssessment.id}
              checked={this.isSelected(riskAssessment)}
              onChange={() => this.handleInputChange(riskAssessment)} />

            <div className="control-indicator"></div>
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.selectedRiskAssessment) {
      return this.props.selectedRiskAssessment.name;
    }
  }

  render() {
    return (
      <div className="risk-assessment-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.riskAssessments.map((riskAssessment) => {
            return this.renderedRiskAssessment(riskAssessment);
          })}
        </form>

        {/*<div className="debug">SELECTED: {this.debugSelected()}</div>*/}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    riskAssessments: state.riskAssessment.riskAssessments,
    selectedRiskAssessment: state.riskAssessment.selectedRiskAssessment
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRiskAssessments,
    selectRiskAssessment
  }, dispatch);
}

RiskAssessmentSelector.displayName = 'RiskAssessmentSelector';

RiskAssessmentSelector.propTypes = {
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  selectedRiskAssessment: riskAssessmentProps,
  fetchRiskAssessments: PropTypes.func.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentSelector);
