import { expect, renderComponent } from '../test_helper';
import { patientTestObject1, patientTestObject2, patientMetaTestObject, selectedPageTestObject,
         populationsTestObject1, careTeamTestObject1, huddleTestObject, riskAssessmentBreakdownObject,
         riskAssessmentTestObject1, riskServiceTestObject1, sortOptionTestObject1 } from '../test_props';
import Patients, { mapStateToProps } from '../../src/containers/Patients';

describe('Patients' , () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      patients: [ patientTestObject1, patientTestObject2 ],
      patientsMeta: patientMetaTestObject,
      patientSearch: 'test',
      pageNum: 1,
      currentPage: 1,
      populations: [ populationsTestObject1 ],
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      careTeams: [ careTeamTestObject1 ],
      selectedCareTeam: careTeamTestObject1,
      huddles: [ huddleTestObject ],
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      loadPatients: () => null,
      filterPatientsByHuddle: () => null,
      filterPatientsByFirstHuddle: () => null,
      fetchPopulations: () => null,
      fetchCareTeams: () => null,
      fetchHuddles: () => null,
      fetchRiskServices: () => null,
      setPatientSearch: () => null,
      selectPage: () => null,
      selectPopulation: () => null,
      unselectPopulation: () => null,
      changePopulationSelectorType: () => null,
      selectRiskService: () => null,
      selectCareTeam: () => null,
      selectSortOption: () => null,
      setSortAscending: () => null
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
        patient: {
          patients: { isFetching: false, items: [ patientTestObject1, patientTestObject2 ], meta: patientMetaTestObject },
          patientSearch: 'test',
          selectedPage: selectedPageTestObject,
          selectedPatient: { isFetching: false, patient: patientTestObject1 }
        },
        population: {
          populations: [ populationsTestObject1 ],
          selectedPopulations: [ populationsTestObject1 ],
          populationSelectorType: 'union'
        },
        huddle: {
          careTeams: { isFetching: false, items: [ careTeamTestObject1 ] },
          huddlesByCareTeam: { [careTeamTestObject1.id]: { isFetching: false, items: [ huddleTestObject ] } },
          selectedCareTeam: careTeamTestObject1,
          selectedHuddle: huddleTestObject,
          addedPatientToHuddle: null
        },
        riskService: {
          riskServices: { isFetching: false, items: [ riskServiceTestObject1 ] },
          selectedRiskService: riskServiceTestObject1
        },
        riskAssessment: {
          riskAssessments: { isFetching: false, items: [ riskAssessmentTestObject1 ] },
          riskBreakdown: { isFetching: false, items: riskAssessmentBreakdownObject },
          selectedRiskAssessment: riskAssessmentTestObject1
        },
        sort: {
          selectedSortOption: sortOptionTestObject1,
          sortAscending: true
        }
      };
    });

    it('will map state to props', () => {
      let stateProps = mapStateToProps(state);
      expect(stateProps.patients.length).to.equal(2);
      expect(stateProps.patientsMeta.total).to.equal(2);
      expect(stateProps.patientSearch).to.equal('test');
      expect(stateProps.pageNum).to.equal(1);
      expect(stateProps.currentPage).to.equal(1);
      expect(stateProps.populations.length).to.equal(1);
      expect(stateProps.selectedPopulations.length).to.equal(1);
      expect(stateProps.populationSelectorType).to.equal('union');
      expect(stateProps.careTeams.length).to.equal(1);
      expect(stateProps.selectedCareTeam.id).to.equal('6');
      expect(stateProps.huddles.length).to.equal(1);
      expect(stateProps.selectedHuddle.id).to.equal('5');
      expect(stateProps.riskServices.length).to.equal(1);
      expect(stateProps.selectedRiskService.id).to.equal('rs1');
      expect(stateProps.sortOption.id).to.equal('11');
      expect(stateProps.sortAscending).to.equal(true);
    });
  });
});
