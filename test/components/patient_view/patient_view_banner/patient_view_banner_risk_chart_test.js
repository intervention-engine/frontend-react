import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTestObject,
         riskAssessmentTypeTestObject1 } from '../../../test_props';
import PatientViewBannerRiskChart from '../../../../src/components/PatientView/PatientViewBanner/PatientViewBannerRiskChart';

describe('Patients View Banner Risk Chart', () => {
  let component;

  beforeEach(() => {
    let props = {
      riskAssessments: [ { 'datetime': '2000-01-01',
                   'value': 3,
                   'pie': 'pieReference1' }, { 'datetime': '2000-01-02',
                                'value': 2,
                                'pie': 'pieReference1' } ],
    }

    component = renderComponent(PatientViewBannerRiskChart, props);
  });

  it('has the correct data', () => {
    expect(component).to.have.class('patient-view-banner-risk-chart');
    // We have two elements
    expect(component.find('svg g circle').length).to.equal(2);
    // We expect the first one to be at a position defined as a linear mapping of
    // [4,0]  => [1,9] which for the value 3 in the first RA is: 3
    expect(component.find('svg g circle').first()).to.have.attr('cy', '3');
  });
});
