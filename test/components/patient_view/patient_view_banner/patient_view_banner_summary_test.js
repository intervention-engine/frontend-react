import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTestObject1, riskAssessmentTestObject2 } from '../../../test_props';
import PatientViewBannerSummary from '../../../../src/components/PatientView/PatientViewBanner/PatientViewBannerSummary';

describe('Patients View Banner Summary', () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      filteredRiskAssessments: [ riskAssessmentTestObject1, riskAssessmentTestObject2 ]
    }

    component = renderComponent(PatientViewBannerSummary, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-banner-summary');
  });

  it('displays the patient name correctly', () => {
    expect(component.find('.patient-stats-name')).to.have.text('Doe, Jane');
  });

  it('displays the patient age correctly', () => {
    expect(component.find('.patient-stats-age')).to.have.text('36 yrs');
  });

  it('displays the patient gender correctly', () => {
    expect(component.find('.patient-stats-gender span')).to.have.class('fa-female');
  });

  xit('displays the correct next huddle date', () => {
    expect(component.find('.patient-stats-next-huddle')).to.have.text(' Jan 1, 2099');
    expect(component.find('.patient-stats-next-huddle span').first()).to.have.class('fa-pie-chart');
    expect(component.find('.patient-stats-next-huddle span').first()).to.have.attr('data-tip', 'Risk Score Warrants Discussion');
    expect(component.find('.patient-stats-next-huddle span:eq(1)')).to.have.attr('data-tip', 'Sample Huddle Group 1');
  });

  it('displays the correct patient risk', () => {
    expect(component.find('.patient-risk-score')).to.have.text('3');
  });
});
