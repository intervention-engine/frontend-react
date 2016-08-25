import { renderComponent , expect } from '../../../../test_helper';
import PopulationFilterSelector from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/PopulationFilterSelector';

describe('PopulationFilterSelector' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(PopulationFilterSelector);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('population-filter-selector');
  });
});
