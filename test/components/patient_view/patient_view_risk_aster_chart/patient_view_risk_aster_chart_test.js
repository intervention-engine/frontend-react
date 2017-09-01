import { expect, renderComponent } from '../../../test_helper';
import { riskAssessmentBreakdownObject, riskAssessmentTestObject1 } from '../../../test_props';
import PatientViewRiskAsterChart from '../../../../src/components/PatientView/PatientViewRiskAsterChart/PatientViewRiskAsterChart';

describe('Patients View Risk Aster Chart', () => {
  let component;

  beforeEach(() => {
    let props = {
      riskAssessmentBreakdown: riskAssessmentBreakdownObject,
      selectedRiskAssessment: riskAssessmentTestObject1
    }

    component = renderComponent(PatientViewRiskAsterChart, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-risk-aster-chart');
  });
});
