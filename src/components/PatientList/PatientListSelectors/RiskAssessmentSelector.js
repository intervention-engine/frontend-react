import React, { Component, PropTypes } from 'react';

import riskAssessmentTypeProps from '../../../prop-types/risk_assessment_type';

export default class RiskAssessmentSelector extends Component {
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
      <div key={riskAssessment.id} className="risk-assessment control-group">
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
          {this.props.riskAssessmentTypes.map((riskAssessment) => {
            return this.renderedRiskAssessment(riskAssessment);
          })}
        </form>

        {/*<div className="debug">SELECTED: {this.debugSelected()}</div>*/}
      </div>
    );
  }
}

RiskAssessmentSelector.displayName = 'RiskAssessmentSelector';

RiskAssessmentSelector.propTypes = {
  riskAssessmentTypes: PropTypes.arrayOf(riskAssessmentTypeProps).isRequired,
  selectedRiskAssessment: riskAssessmentTypeProps.isRequired,
  selectRiskAssessment: PropTypes.func.isRequired
};
