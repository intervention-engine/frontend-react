import React, { Component } from 'react';
import _ from 'lodash';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

import patientProps from '../../../prop-types/patient';

export default class PatientViewStatsMedications extends Component {
  constructor(...args) {
    super(...args);

    let medications = this.getActiveMedications(this.props.patient);
    let uniqueMedicationsText = _.uniq(medications.map((medication) => medication.medicationCodeableConcept.text));

    this.state = {
      medications,
      uniqueMedicationsText,
      uniqueMedicationsTextCount: uniqueMedicationsText.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patient != this.props.patient) {
      let medications = this.getActiveMedications(nextProps.patient);
      let uniqueMedicationsText = _.uniq(medications.map((medication) => medication.medicationCodeableConcept.text));
      this.setState({ medications, uniqueMedicationsText, uniqueMedicationsTextCount: uniqueMedicationsText.length });
    }
  }

  getActiveMedications(patient){
    if (patient != null && patient.MedicationStatement != null) {
      let medications = patient.MedicationStatement;
      return medications.filter(this.isActiveMedication);
    } else {
      return [];
    }
  }

  isActiveMedication(medication) {
    let startDate;
    if (medication.effectivePeriod.start != null) {
       startDate = new Date(medication.effectivePeriod.start);
    }

    let endDate;
    if (medication.effectivePeriod.end != null) {
      endDate = new Date(medication.effectivePeriod.end);
    }

    let today = new Date();

    return (startDate <= today
            && (endDate == null || endDate >= today)
            && medication.status === "active");
  }

  renderedMedications() {
    return this.state.uniqueMedicationsText.map((medicationText, index) => {
      return <li key={index}>{medicationText}</li>;
    });
  }

  render() {
    return (
      <div className="patient-view-stats-medications">
        <CollapsiblePanel panelTitle="Medications"
                          panelIcon="fc-medication"
                          panelCount={this.state.uniqueMedicationsTextCount}>
          <div className="patient-view-stats-medications-list">
            <ul>{this.renderedMedications()}</ul>
          </div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsMedications.displayName = 'PatientViewStatsMedications';

PatientViewStatsMedications.propTypes = {
  patient: patientProps
};
