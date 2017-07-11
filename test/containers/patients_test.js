import { expect, renderComponent } from '../test_helper';
import { patientTestObject1, patientTestObject2, patientsMetaTestObject,
         populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskAssessmentTestObject1, riskServiceTestObject1,
         sortOptionTestObject1 } from '../test_props';
import Patients, { mapStateToProps } from '../../src/containers/Patients';

describe('Patients' , () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      patients: [ patientTestObject1, patientTestObject2 ],
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
      riskServices: [ riskServiceTestObject1 ],
      riskAssessments: [ riskAssessmentTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      fetchPatients: () => null,
      fetchPopulations: () => null,
      fetchHuddles: () => null,
      fetchRiskServices: () => null,
      fetchRiskAssessments: () => null,
      setPatientSearch: () => null,
      selectPage: () => null,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskService: () => null,
      selectHuddleGroup: () => null,
      selectHuddle: () => null,
      selectSortOption: () => null,
      setSortAscending: () => null,
      params: { patient_id: '1' }
    };

    component = renderComponent(Patients, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patients');
  });

  it('shows a page header', () => {
    expect(component.find('.page-header')).to.exist;
  });

  describe('mapStateToProps', () => {
    let state;

    beforeEach(() => {
      state = {
        patient: { patients: [ patientTestObject1, patientTestObject2 ],
                   patientsMeta: patientsMetaTestObject,
                   patientSearch: '',
                   pageNum: 1,
                   currentPage: 1,
                   patientsPerPage: 10 },
        population: { populations: [ populationsTestObject1 ],
                      selectedPopulations: [ populationsTestObject1 ],
                      populationSelectorType: 'union' },
        huddle: { huddles: [ huddleGroupTestObject1 ],
                  selectedHuddleGroup: huddleGroupTestObject1,
                  selectedHuddle: huddleTestObject },
        riskService: { riskServices: [ riskServiceTestObject1 ],
                       selectedRiskService: riskServiceTestObject1 },
        riskAssessment: { riskAssessments: [ riskAssessmentTestObject1 ] },
        sort: { sortOption: sortOptionTestObject1,
                sortAscending: true }
      };
    });

    it('will map state to props', () => {
      let stateProps = mapStateToProps(state);
      expect(stateProps.patients.length).to.equal(2);
    });
  });
});
