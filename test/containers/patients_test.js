import { expect, renderComponent } from '../test_helper';
import { patientTestObject1, patientTestObject2, patientsMetaTestObject,
         populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskAssessmentTestObject, riskAssessmentTypeTestObject1,
         sortOptionTestObject1 } from '../test_props';
import Patients, { mapStateToProps } from '../../src/containers/Patients';

describe('Patients' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Patients);
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
                   meta: patientsMetaTestObject,
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
        riskAssessment: { riskAssessments: [ riskAssessmentTestObject ],
                          selectedRiskAssessment: riskAssessmentTypeTestObject1 },
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
