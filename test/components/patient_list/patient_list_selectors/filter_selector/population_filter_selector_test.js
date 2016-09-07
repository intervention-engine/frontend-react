import { expect, renderComponent } from '../../../../test_helper';
import PopulationFilterSelectorRedux, { PopulationFilterSelector, mapStateToProps } from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/PopulationFilterSelector';

describe('PopulationFilterSelector' , () => {
  let component;
  let populationObject;
  let state;

  beforeEach(() => {
    populationObject = {
      'id': '1',
      'meta': { 'lastUpdated': '2016-05-12T12:45:11.429-04:00' },
      'name': 'Sample Population',
      'characteristic': [ {'code': { 'coding': [{ 'system': 'Sample System',
                                                 'code': 'Sample Code',
                                                 'userSelected': false }],
                                    'text': 'Sample Text' } }] };

    state = {
      population: {
        populations: [ populationObject ],
        selectedPopulations: [ populationObject ],
        populationSelectorType: 'union'
      }
    };

    component = renderComponent(PopulationFilterSelectorRedux, {}, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('population-filter-selector');
  });

  it('maps state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.populations.length).to.equal(1);
    expect(stateProps.selectedPopulations[0]).to.equal(populationObject);
  });

  it('displays the population name', () => {
    expect(component.find(".population-name").first()).to.have.text('Sample Population');
  });

  it('can select a population', () => {
    let executed = false;
    let props = {
      populations: [ populationObject ],
      selectedPopulations: [],
      fetchPopulations() {},
      selectPopulation(population) { executed = (population === populationObject); }
    };

    let component = renderComponent(PopulationFilterSelector, props);
    component.find('input[type=checkbox]').simulate('change');
    expect(executed).to.be.true;
  });

  it('can unselect a population', () => {
    let executed = false;
    let props = {
      populations: [ populationObject ],
      selectedPopulations: [ populationObject ],
      fetchPopulations() {},
      unselectPopulation(population) { executed = (population === populationObject); }
    };

    let component = renderComponent(PopulationFilterSelector, props);
    component.find('input[type=checkbox]').simulate('change');
    expect(executed).to.be.true;
  });

  it('can select a population type', () => {
    let executed = false;
    let props = {
      populations: [ populationObject ],
      selectedPopulations: [ populationObject ],
      populationSelectorType: 'union',
      fetchPopulations() {},
      changePopulationSelectorType(type) { executed = (type === 'intersection'); }
    };

    let component = renderComponent(PopulationFilterSelector, props);
    component.find('.selector-type-intersection').simulate('click');
    expect(executed).to.be.true;
  });
});
