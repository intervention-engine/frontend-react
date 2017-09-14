import React, { Component, PropTypes } from 'react';

import riskServiceProps from '../../../prop-types/risk_service';

export default class RiskServiceSelector extends Component {
  isSelected(riskService) {
    return this.props.selectedRiskService === riskService;
  }

  handleInputChange(riskService) {
    if (this.props.selectedRiskService === riskService) { return; }
    this.props.selectRiskService(riskService);
  }

  renderedRiskServices() {
    if (this.props.riskServices == null) { return; }

    return this.props.riskServices.map((riskService) => {
      return (
        <div key={riskService.id} className="risk-service control-group">
          <label htmlFor={`risk-service-radio-${riskService.id}`} className={`control control-radio`}>
            <span className="risk-service-name">{riskService.name}</span>

            <input type="radio"
              name="riskService"
              id={`risk-service-radio-${riskService.id}`}
              value={riskService.id}
              checked={this.isSelected(riskService)}
              onChange={() => this.handleInputChange(riskService)} />

            <div className="control-indicator"></div>
          </label>
        </div>
      );
    });
  }

  debugSelected() {
    if (this.props.selectedRiskService) {
      return this.props.selectedRiskService.name;
    }
  }

  render() {
    return (
      <div className="risk-service-selector">
        <form className="form-horizontal form-group-striped">
          {this.renderedRiskServices()}
        </form>
      </div>
    );
  }
}

RiskServiceSelector.displayName = 'RiskServiceSelector';

RiskServiceSelector.propTypes = {
  riskServices: PropTypes.arrayOf(riskServiceProps),
  selectedRiskService: riskServiceProps,
  selectRiskService: PropTypes.func.isRequired
};
