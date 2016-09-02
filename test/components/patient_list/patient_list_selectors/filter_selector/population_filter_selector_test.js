import { expect, renderComponent } from '../../../../test_helper';
import PopulationFilterSelectorRedux, { PopulationFilterSelector, mapStateToProps } from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/PopulationFilterSelector';

describe('PopulationFilterSelector' , () => {
  let component;
  let populationObject;
  let state;

  beforeEach(() => {
    populationObject = {
      'id': 1,
      'meta': { 'createdOn': '2016-05-12T12:45:11.429-04:00',
                'lastUpdatedOn': '2016-05-12T12:45:11.429-04:00' },
      'name': 'Sample Population',
      'characteristic': [ 'code': { 'coding': [{ 'system': 'Sample System',
                                                 'code': 'Sample Code',
                                                 'userSelected': false }],
                                    'text': 'Sample Text' } ] };

    state = {
      population: {
        populations: [ populationObject ],
        selectedPopulation: populationObject
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
    expect(stateProps.selectedPopulation).to.equal(populationObject);
  });

  it('displays the population name', () => {
    expect(component.find(".population-name").first()).to.have.text('Sample Population');
  });

  it('can select a population', () => {
    let executed = false;
    let props = {
      populations: [ populationObject ],
      selectedPopulation: null,
      fetchPopulations() {},
      selectPopulation(population) { executed = (population === populationObject); }
    };

    let component = renderComponent(PopulationFilterSelector, props);
    component.find('input[type=radio]').simulate('change');
    expect(executed).to.be.true;
  });

  it('can deselect a population', () => {
    let executed = false;
    let props = {
      populations: [ populationObject ],
      selectedPopulation: populationObject,
      fetchPopulations() {},
      selectPopulation(population) { executed = (population === null); }
    };

    let component = renderComponent(PopulationFilterSelector, props);
    component.find('input[type=radio]').simulate('change');
    expect(executed).to.be.true;
  });
});
