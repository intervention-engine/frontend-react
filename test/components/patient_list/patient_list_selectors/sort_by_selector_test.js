import { renderComponent , expect } from '../../../test_helper';
import SortBySelector from '../../../../src/components/PatientList/PatientListSelectors/SortBySelector';

describe('SortBySelector' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(SortBySelector);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('sort-by-selector');
  });
});
