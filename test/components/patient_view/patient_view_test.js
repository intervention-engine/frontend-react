import { renderComponent , expect } from '../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTypeTestObject1,
         riskAssessmentTestObject } from '../../test_props';
import PatientView from '../../../src/components/PatientView/PatientView';

describe('Patient View' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1
    }

    component = renderComponent(PatientView, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view');
  });
});
