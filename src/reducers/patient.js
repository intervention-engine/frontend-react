import { combineReducers } from 'redux';

import {
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  REQUEST_PATIENT,
  RECEIVE_PATIENT,
  SET_PATIENT_SEARCH,
  SELECT_PAGE
} from '../actions/types';

export const PATIENTS_PER_PAGE = 10;

// ------------------------- PATIENTS -------------------------------------- //

function patients(state = { isFetching: false, items: [], meta: { total: 0 } }, action) {
  switch(action.type) {
    case REQUEST_PATIENTS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_PATIENTS:
      let total = action.totalPatients;

      return Object.assign({}, state, {
        isFetching: false,
        items: action.patients,
        meta: { total, pageNum: Math.ceil(total / PATIENTS_PER_PAGE) }
      });
    default:
      return state;
  }
}

// ------------------------- PATIENT --------------------------------------- //

function selectedPatient(state = { isFetching: false, patient: null }, action) {
  switch(action.type) {
    case REQUEST_PATIENT:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_PATIENT:
      return Object.assign({}, state, {
        isFetching: false,
        patient: action.patient
      });
    default:
      return state;
  }
}

// ------------------------- PATIENT SEARCH -------------------------------- //

function patientSearch(state = '', action) {
  switch(action.type) {
    case SET_PATIENT_SEARCH:
      return action.term;
    default:
      return state;
  }
}

// ------------------------- SELECT PAGE ----------------------------------- //

function selectedPage(state = { pageNum: 1, currentPage: 1 }, action) {
  switch(action.type) {
    case SET_PATIENT_SEARCH:
      return { ...state, currentPage: 1 };
    case SELECT_PAGE:
      return Object.assign({}, state, { currentPage: action.page });
    case RECEIVE_PATIENTS:
      return Object.assign({}, state, {
        pageNum: Math.ceil(action.totalPatients / PATIENTS_PER_PAGE)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  patients,
  selectedPatient,
  patientSearch,
  selectedPage
});

export default rootReducer;
