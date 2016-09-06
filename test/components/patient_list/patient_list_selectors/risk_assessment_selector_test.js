import { renderComponent , expect } from '../../../test_helper';
import RiskAssessmentSelector from '../../../../src/components/PatientList/PatientListSelectors/RiskAssessmentSelector';

describe('RiskAssessmentSelector' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(RiskAssessmentSelector);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('risk-assessment-selector');
  });
});
