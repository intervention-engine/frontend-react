import { renderComponent , expect } from '../../../test_helper';
import { populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskServiceTestObject1, sortOptionTestObject1 } from '../../../test_props';
import PatientListSelectors from '../../../../src/components/PatientList/PatientListSelectors/PatientListSelectors';

describe('PatientListSelectors' , () => {
  let component;

  beforeEach(() => {
    let props = {
      populations: [ populationsTestObject1 ],
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddleGroup: huddleGroupTestObject1,
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      sortOptions: [ sortOptionTestObject1 ],
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskService: () => null,
      selectHuddleGroup: () => null,
      selectHuddle: () => null,
      selectSortOption: () => null,
      setSortAscending: () => null
    };

    component = renderComponent(PatientListSelectors, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-selectors');
  });
});
