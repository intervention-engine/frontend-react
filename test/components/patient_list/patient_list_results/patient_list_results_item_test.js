import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, huddleGroupTestObject1, riskAssessmentTestObject } from '../../../test_props';
import PatientListResultsItem from '../../../../src/components/PatientList/PatientListResults/PatientListResultsItem';

describe('Patients List Results Item', () => {
  let component;

  beforeEach(() => {
    let props = {
      key: '1',
      patient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ]
    }

    component = renderComponent(PatientListResultsItem, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-info');
  });

  it('displays the patient name correctly', () => {
    expect(component.find('.patient-name')).to.have.text('Doe, Jane');
  });

  it('displays the patient age correctly', () => {
    expect(component.find('.patient-age')).to.have.text(' 36 yrs');
  });

  it('displays the patient gender correctly', () => {
    expect(component.find('.patient-gender span')).to.have.class('fa-female');
  });

  it('displays the correct next huddle date', () => {
    expect(component.find('.patient-next-huddle-date')).to.have.text('Thu, Jan 1st 2099 Sample Huddle Group 1');
  });

  it('displays the correct patient risk', () => {
    expect(component.find('.patient-risk')).to.have.text('3');
  });
});
