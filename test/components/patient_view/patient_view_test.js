import { renderComponent , expect } from '../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTypeTestObject1,
         riskAssessmentTestObject, huddleTestObject } from '../../test_props';
import PatientView from '../../../src/components/PatientView/PatientView';

describe('Patient View' , () => {
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

    component = renderComponent(PatientView, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view');
  });
});
