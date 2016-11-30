import React, { Component } from 'react';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

export default class PatientViewStatsMedications extends Component {
  render() {
    return (
      <div className="patient-view-stats-medications">
        <CollapsiblePanel panelTitle="Medications">
          <div>Medications</div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsMedications.displayName = 'PatientViewStatsMedications';

PatientViewStatsMedications.propTypes = {

};
