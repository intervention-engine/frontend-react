import React, { Component, PropTypes } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';
import RiskServiceSelector from '../../PatientList/PatientListSelectors/RiskServiceSelector';

import riskServiceProps from '../../../prop-types/risk_service';

export default class PatientViewStatsRiskService extends Component {
  render() {
    return (
      <div className="patient-view-stats-risk-service">
        <CollapsiblePanel panelTitle="Risk Service" panelIcon="pie-chart">
          <RiskServiceSelector riskServices= {this.props.riskServices}
                               selectedRiskService={this.props.selectedRiskService}
                               selectRiskService={this.props.selectRiskService} />
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsRiskService.displayName = 'PatientViewStatsRiskService';

PatientViewStatsRiskService.propTypes = {
  riskServices: PropTypes.arrayOf(riskServiceProps),
  selectedRiskService: riskServiceProps.isRequired,
  selectRiskService: PropTypes.func.isRequired
};
