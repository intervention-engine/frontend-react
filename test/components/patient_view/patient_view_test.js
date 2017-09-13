import { expect, renderComponent } from '../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskServiceTestObject1,
         riskAssessmentTestObject1, huddleTestObject, riskAssessmentBreakdownObject } from '../../test_props';
import PatientView from '../../../src/components/PatientView/PatientView';

describe('Patient View' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      riskAssessments: [ riskAssessmentTestObject1 ],
      selectedRiskAssessment: riskAssessmentTestObject1,
      riskAssessmentBreakdown: riskAssessmentBreakdownObject,
      selectHuddle: () => null,
      selectRiskService: () => null,
      selectRiskAssessment: () => null,
      addPatientToHuddle: () => null
    }

    component = renderComponent(PatientView, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view');
  });
});
