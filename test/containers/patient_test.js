import { expect, renderComponent } from '../test_helper';
import { patientTestObject1, patientTestObject2, patientsMetaTestObject,
         populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskAssessmentTestObject1, riskServiceTestObject1,
         sortOptionTestObject1 } from '../test_props';
import PatientRedux, { Patient, mapStateToProps } from '../../src/containers/Patient';

describe.only('Patient' , () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      selectedPatient: patientTestObject1,
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddle: huddleTestObject,
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      riskAssessments: [ riskAssessmentTestObject1 ],
      fetchPatient: () => null,
      fetchHuddles: () => null,
      selectHuddle: () => null,
      addPatientToHuddle: () => null,
      fetchRiskServices: () => null,
      fetchRiskAssessments: () => null,
      selectRiskService: () => null,
      params: { patient_id: '1' }
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
        patient: { patients: [ patientTestObject1, patientTestObject2 ],
                   meta: patientsMetaTestObject,
                   patientSearch: '',
                   pageNum: 1,
                   currentPage: 1,
                   patientsPerPage: 10,
                   selectedPatient: patientTestObject1 },
        population: { populations: [ populationsTestObject1 ],
                      selectedPopulations: [ populationsTestObject1 ],
                      populationSelectorType: 'union' },
        huddle: { huddles: [ huddleGroupTestObject1 ],
                  selectedHuddleGroup: huddleGroupTestObject1,
                  selectedHuddle: huddleTestObject },
        riskService: { riskServices: [ riskServiceTestObject1 ],
                       selectedRiskService: riskServiceTestObject1 },
        riskAssessment: { riskAssessments: [ riskAssessmentTestObject1 ],
                          selectedRiskAssessment: riskServiceTestObject1 },
        sort: { sortOption: sortOptionTestObject1,
                sortAscending: true }
      };
    });

    it('will map state to props', () => {
      let stateProps = mapStateToProps(state);
      expect(stateProps.selectedPatient.id).to.equal('1');
      expect(stateProps.huddles.length).to.equal(1);
      expect(stateProps.riskServices.length).to.equal(1);
      expect(stateProps.riskAssessments.length).to.equal(1);
      expect(stateProps.selectedRiskService.id).to.equal('rs1');
    });
  });
});
