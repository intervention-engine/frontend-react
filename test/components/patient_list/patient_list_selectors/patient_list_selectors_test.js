import { renderComponent , expect } from '../../../test_helper';
import PatientListSelectors from '../../../../src/components/PatientList/PatientListSelectors/PatientListSelectors';

describe('PatientListSelectors' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(PatientListSelectors);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-selectors');
  });
});
