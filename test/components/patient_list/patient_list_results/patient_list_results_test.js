import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, patientTestObject2, huddleGroupTestObject1,
         riskAssessmentTestObject, patientsMetaTestObject } from '../../../test_props';
import PatientListResults from '../../../../src/components/PatientList/PatientListResults/PatientListResults';

describe('Patients List Results', () => {
  let component;

  beforeEach(() => {
    let props = {
      patients: [ patientTestObject1, patientTestObject2 ],
      patientsMeta: patientsMetaTestObject,
      huddles: [ huddleGroupTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ]
    }

    component = renderComponent(PatientListResults, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-results');
  });

  it('displays the correct patient count', () => {
    expect(component.find('.patient-count')).to.have.text('Patients (2)');
  });

  it('displays the correct number of patientListResultItems', () => {
    expect(component.find('.patient-list-results-item').length).to.equal(2);
  });
});
