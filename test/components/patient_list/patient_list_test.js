import { renderComponent , expect } from '../../test_helper';
import { patientTestObject1, patientMetaTestObject, populationsTestObject1, careTeamTestObject1,
         huddleTestObject, riskServiceTestObject1, sortOptionTestObject1 } from '../../test_props';
import PatientList from '../../../src/components/PatientList/PatientList';

describe('PatientList' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patients: [ patientTestObject1 ],
      patientsMeta: patientMetaTestObject,
      patientSearch: '',
      pageNum: 1,
      currentPage: 1,
      patientsPerPage: 10,
      populations: [ populationsTestObject1 ],
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      huddles: [ careTeamTestObject1 ],
      selectedHuddleGroup: careTeamTestObject1,
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      sortOptions: [ sortOptionTestObject1 ],
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      setPatientSearch: () => null,
      selectPage: () => null,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskService: () => null,
      selectHuddleGroup: () => null,
      selectHuddle: () => null,
      selectSortOption: () => null,
      setSortAscending: () => null
    }

    component = renderComponent(PatientList, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list');
  });
});
