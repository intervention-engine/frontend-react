import { expect, renderComponent } from '../../../test_helper';
import { riskAssessmentTestObject1, riskAssessmentTestObject2 } from '../../../test_props';
import PatientViewBannerRiskChart from '../../../../src/components/PatientView/PatientViewBanner/PatientViewBannerRiskChart';

describe('Patients View Banner Risk Chart', () => {
  let component;

  beforeEach(() => {
    let props = {
      riskAssessments: [ riskAssessmentTestObject1, riskAssessmentTestObject2 ]
    }

    component = renderComponent(PatientViewBannerRiskChart, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-banner-risk-chart');
  });

  it('has the correct data', () => {
    expect(component.find('svg g circle').length).to.equal(2); // 2 elements
    expect(component.find('svg g circle').first()).to.have.attr('cy', '60');
  });
});
