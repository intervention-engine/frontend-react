import { renderComponent , expect } from '../../../../test_helper';
import FilterSelector from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/FilterSelector';

describe('FilterSelector' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(FilterSelector);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('filter-selector');
  });
});
