import { expect } from '../test_helper';
import TestUtils from 'react-addons-test-utils';
import { patientTestObject1, patientTestObject2, patientsMetaTestObject,
         populationsTestObject1, huddleGroupTestObject1, huddleTestObject,
         riskAssessmentTestObject1,
         sortOptionTestObject1 } from '../test_props';
import PrintPatientList, { mapStateToProps } from '../../src/containers/PrintPatientList';

describe('PrintPatientList' , () => {
  let state;

  beforeEach(() => {
    state = {
      patient: { patients: [ patientTestObject1, patientTestObject2 ] },
      population: { selectedPopulations: [ populationsTestObject1 ] },
      huddle: { huddles: [ huddleGroupTestObject1 ] },
      riskAssessment: { riskAssessments: [ riskAssessmentTestObject1 ] }
    };
  });

  it('will map state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.patients.length).to.equal(2);
  });
});
