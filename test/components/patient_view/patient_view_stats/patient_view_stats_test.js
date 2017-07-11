import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskServiceTestObject1,
         riskAssessmentTestObject1, huddleTestObject } from '../../../test_props';
import PatientViewStats from '../../../../src/components/PatientView/PatientViewStats/PatientViewStats';

describe('Patient View Stats' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      selectHuddle: () => null,
      selectRiskService: () => null,
      addPatientToHuddle: () => null
    }

    component = renderComponent(PatientViewStats, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats');
  });
});
