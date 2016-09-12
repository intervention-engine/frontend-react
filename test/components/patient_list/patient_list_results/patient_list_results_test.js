import { expect, renderComponent } from '../../../test_helper';
import PatientListResults from '../../../../src/components/PatientListResults/PatientListResults';

describe('Patients List Results', () => {
  let component;
  let state;


  beforeEach(() => {
    component = renderComponent(PatientListResults)
  })

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-results');
  });
});
