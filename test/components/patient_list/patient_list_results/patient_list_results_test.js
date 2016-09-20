import { expect, renderComponent } from '../../../test_helper';
import PatientListResults from '../../../../src/components/PatientList/PatientListResults/PatientListResults';

describe('Patients List Results', () => {
  let component;
  let props;
  let patientsObject;


  beforeEach(() => {
    patientsObject = {
      meta: {total: 120},
      patients: [
        {id: 1, gender: 'female', birthDate: '1936-11-13', name: [ {family: 'Wagner', given: 'Virginia'} ] }
      ]
    };

    props = {
      patients: patientsObject
    };
    component = renderComponent(PatientListResults, props, {});
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-results');
  });

  it('displays the proper patient count', () => {
    expect(component.find('.patient-count')).to.have.text('Patients (120)');
  });

  it('displays the correct number of patientListResultItems', () => {
    expect(component.find('.patient-info').length).to.equal(1);
  });
});
