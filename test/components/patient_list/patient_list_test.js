import { renderComponent , expect } from '../../test_helper';
import PatientList from '../../../src/components/PatientList/PatientList';

describe('PatientList' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(PatientList);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list');
  });
});
