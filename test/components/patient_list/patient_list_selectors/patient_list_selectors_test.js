import { renderComponent , expect } from '../../../test_helper';
import { populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskAssessmentTypeTestObject1, sortOptionTestObject1 } from '../../../test_props';
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
      riskAssessmentTypes: [ riskAssessmentTypeTestObject1 ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1,
      sortOptions: [ sortOptionTestObject1 ],
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskAssessment: () => null,
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
