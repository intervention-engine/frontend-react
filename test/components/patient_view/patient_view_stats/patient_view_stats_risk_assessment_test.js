import { expect, renderComponent } from '../../../test_helper';
import { riskAssessmentTypeTestObject1 } from '../../../test_props';
import PatientViewStatsRiskAssessment from '../../../../src/components/PatientView/PatientViewStats/PatientViewStatsRiskAssessment';

describe('Patient View Stats Risk Assessment' , () => {
  let component;

  beforeEach(() => {
    let props = {
      riskAssessmentTypes: [ riskAssessmentTypeTestObject1 ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1,
      selectRiskAssessment: () => null
    }

    component = renderComponent(PatientViewStatsRiskAssessment, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats-risk-assessment');
  });

  it('displays the panel title correctly', () => {
    expect(component.find('.panel-title')).to.have.text(' Risk Assessment ');
  });
});
