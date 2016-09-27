import { expect, renderComponent } from '../../../../test_helper';
import { populationsTestObject1, populationsTestObject2 } from '../../../../test_props';
import PopulationFilterSelector from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/PopulationFilterSelector';

describe('PopulationFilterSelector' , () => {
  let component;
  let selectedPopulations;
  let populationSelectorType;

  beforeEach(() => {
    selectedPopulations =  [ populationsTestObject1 ];
    populationSelectorType = 'union';

    let props = {
      populations: [ populationsTestObject1, populationsTestObject2 ],
      selectedPopulations,
      populationSelectorType,
      selectPopulation(population) { selectedPopulations.push(population) },
      unselectPopulation(population) {
        let index = selectedPopulations.indexOf(population);
        if (index !== -1) {
          selectedPopulations.splice(index, 1);
        }
      },
      changePopulationSelectorType(type) { populationSelectorType = type }
    };

    component = renderComponent(PopulationFilterSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('population-filter-selector');
  });

  it('displays the population name', () => {
    expect(component.find(".population-name").first()).to.have.text('Sample Population Name 1');
  });

  it('can select a population', () => {
    component.find('input[type=checkbox]:eq(1)').simulate('change');
    expect(selectedPopulations).to.eql([ populationsTestObject1, populationsTestObject2 ]);
  });

  it('can unselect a population', () => {
    component.find('input[type=checkbox]').simulate('change');
    expect(selectedPopulations).to.eql([]);
  });

  it('can select a population type', () => {
    component.find('.selector-type-intersection').simulate('click');
    expect(populationSelectorType).to.eq('intersection');
  });
});
