import { expect, renderComponent } from '../test_helper';
import { patientTestObject1, patientTestObject2, patientMetaTestObject, selectedPageTestObject,
         populationsTestObject1, careTeamTestObject1, huddleTestObject,
         riskAssessmentTestObject1, riskServiceTestObject1, riskAssessmentBreakdownObject,
         sortOptionTestObject1 } from '../test_props';
import PatientRedux, { Patient, mapStateToProps } from '../../src/containers/Patient';

describe('Patient' , () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      location: {},
      params: { patient_id: '1' },
      patient: patientTestObject1,
      loading: false,
      selectedPatient: patientTestObject1,
      careTeams: [ careTeamTestObject1 ],
      selectedCareTeam: careTeamTestObject1,
      huddles: [ huddleTestObject ],
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      riskAssessments: [ riskAssessmentTestObject1 ],
      selectedRiskAssessment: riskAssessmentTestObject1,
      riskAssessmentBreakdown: riskAssessmentBreakdownObject,
      loadPatient: () => null,
      selectHuddle: () => null,
      addPatientToHuddle: () => null,
      selectRiskService: () => null,
      selectRiskAssessment: () => null,
      riskAssessmentBreakdownLoading: false
    };

    component = renderComponent(Patient, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient');
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
          patientSearch: '',
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
          riskBreakdown: { isFetching: false, initialLoad: false, items: riskAssessmentBreakdownObject },
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
      expect(stateProps.selectedPatient.id).to.equal('1');
      expect(stateProps.careTeams.length).to.equal(1);
      expect(stateProps.selectedCareTeam.id).to.equal('6');
      expect(stateProps.huddles.length).to.equal(1);
      expect(stateProps.selectedHuddle.id).to.equal('5');
      expect(stateProps.riskServices.length).to.equal(1);
      expect(stateProps.selectedRiskService.id).to.equal('rs1');
      expect(stateProps.riskAssessments.length).to.equal(1);
      expect(stateProps.selectedRiskAssessment.id).to.equal('ra1');
      expect(stateProps.riskAssessmentBreakdown.length).to.equal(4);
      expect(stateProps.riskAssessmentBreakdownLoading).to.equal(false);
    });
  });
});
