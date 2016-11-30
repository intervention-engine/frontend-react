import React, { Component } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

export default class PatientViewStatsConditions extends Component {
  render() {
    return (
      <div className="patient-view-stats-conditions">
        <CollapsiblePanel panelTitle="Conditions">
          <div>Conditions</div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsConditions.displayName = 'PatientViewStatsConditions';

PatientViewStatsConditions.propTypes = {

};
