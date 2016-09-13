import { renderComponent , expect } from '../../../../../test_helper';
import HuddleFilterSelector from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterSelector';

describe('HuddleFilterSelector' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(HuddleFilterSelector);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-selector');
  });
});
