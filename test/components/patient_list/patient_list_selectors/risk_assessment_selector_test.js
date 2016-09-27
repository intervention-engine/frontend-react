import { expect, renderComponent } from '../../../test_helper';
import { riskAssessmentTypeTestObject1, riskAssessmentTypeTestObject2 } from '../../../test_props';
import RiskAssessmentSelector from '../../../../src/components/PatientList/PatientListSelectors/RiskAssessmentSelector';

describe('RiskAssessmentSelector' , () => {
  let component;
  let selectedRiskAssessment;

  beforeEach(() => {
    selectedRiskAssessment = riskAssessmentTypeTestObject1;

    let props = {
      riskAssessmentTypes: [ riskAssessmentTypeTestObject1, riskAssessmentTypeTestObject2 ],
      selectedRiskAssessment,
      selectRiskAssessment(riskAssessment) { selectedRiskAssessment = riskAssessment; }
    };

    component = renderComponent(RiskAssessmentSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('risk-assessment-selector');
  });

  it('displays the correct risk assessment name', () => {
    expect(component.find(".risk-assessment-name").first()).to.have.text('Sample Risk Assessment 1');
  });

  it('can select a risk assessment', () => {
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(selectedRiskAssessment).to.eq(riskAssessmentTypeTestObject2);
  });
});
