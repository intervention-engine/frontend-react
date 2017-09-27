import { renderComponent , expect } from '../../../../test_helper';
import { populationsTestObject1, careTeamTestObject1, huddleTestObject } from '../../../../test_props';
import FilterSelector from '../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/FilterSelector';

describe('FilterSelector' , () => {
  let component;

  beforeEach(() => {
    let props = {
      populations: [ populationsTestObject1 ],
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      careTeams: [ careTeamTestObject1 ],
      selectedCareTeam: careTeamTestObject1,
      huddles: [ huddleTestObject ],
      selectedHuddle: huddleTestObject,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectCareTeam: () => null,
      filterPatientsByHuddle: () => null,
      filterPatientsByFirstHuddle: () => null
    };

    component = renderComponent(FilterSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('filter-selector');
  });
});
