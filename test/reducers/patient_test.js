import { expect, renderComponent } from '../test_helper';
import patient from '../../src/reducers/patient';

import {
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  REQUEST_PATIENT,
  RECEIVE_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE
} from '../../src/actions/types';

describe('Patient Reducer', () => {
  it('When changing the patient search the correct page is set', () => {
    const state = { selectedPage: { currentPage: 2 } };
    const newState = patient(state, { term: '', type: SET_PATIENT_SEARCH });
    expect(newState.selectedPage.currentPage).to.equal(1);
    expect(newState.patientSearch).to.equal('');
  });
});
