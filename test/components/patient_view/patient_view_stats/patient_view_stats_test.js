import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTypeTestObject1,
         riskAssessmentTestObject, huddleTestObject } from '../../../test_props';
import PatientViewStats from '../../../../src/components/PatientView/PatientViewStats/PatientViewStats';

describe('Patient View Stats' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddle: huddleTestObject,
      riskAssessmentTypes: [ riskAssessmentTypeTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1,
      selectHuddle: () => null,
      selectRiskAssessment: () => null,
      addPatientToHuddle: () => null
    }

    component = renderComponent(PatientViewStats, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats');
  });
});
