import { renderComponent , expect } from '../../test_helper';
import { patientTestObject1, patientsMetaTestObject, populationsTestObject1, huddleGroupTestObject1,
         huddleTestObject, riskAssessmentTypeTestObject1, riskAssessmentTestObject,
         sortOptionTestObject1 } from '../../test_props';
import PatientList from '../../../src/components/PatientList/PatientList';

describe('PatientList' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patients: [ patientTestObject1 ],
      patientsMeta: patientsMetaTestObject,
      patientSearch: '',
      pageNum: 1,
      currentPage: 1,
      patientsPerPage: 10,
      populations: [ populationsTestObject1 ],
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddleGroup: huddleGroupTestObject1,
      selectedHuddle: huddleTestObject,
      riskAssessmentTypes: [ riskAssessmentTypeTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject ],
      selectedRiskAssessment: riskAssessmentTypeTestObject1,
      sortOptions: [ sortOptionTestObject1 ],
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      setPatientSearch: () => null,
      selectPage: () => null,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskAssessment: () => null,
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
