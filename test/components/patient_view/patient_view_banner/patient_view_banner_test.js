import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTestObject,
         riskAssessmentTypeTestObject1 } from '../../../test_props';
import PatientViewBanner from '../../../../src/components/PatientView/PatientViewBanner/PatientViewBanner';

describe('Patients View Banner', () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1
    }

    component = renderComponent(PatientViewBanner, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-banner');
  });
});
