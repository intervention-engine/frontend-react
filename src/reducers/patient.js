import {
  FETCH_PATIENTS_FULFILLED,
  SET_PATIENT_SEARCH,
  SELECT_PAGE,
  FETCH_PATIENT_FULFILLED
} from '../actions/types';

export default function(state = { patients: null,
                                  meta: {},
                                  patientSearch: '',
                                  pageNum: 1,
                                  selectedPatient: null,
                                  currentPage: 1,
                                  patientsPerPage: 10 }, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_FULFILLED:
      return { ...state, patients: action.payload.data.patients || [],
                         meta: action.payload.data.Meta,
                         pageNum: Math.ceil(action.payload.data.Meta.total / state.patientsPerPage) };
    case SET_PATIENT_SEARCH:
      // We want to reset the page to 1 so the search results are shown.
      return { ...state, patientSearch: action.payload, currentPage: 1 };
    case SELECT_PAGE:
      return { ...state, currentPage: action.payload };
    case FETCH_PATIENT_FULFILLED:
      let { Encounter, Condition, MedicationStatement, RiskAssessment } = action.payload.data;
      let selectedPatient = { ...action.payload.data.Patient[0], Encounter, Condition, MedicationStatement, RiskAssessment };
      return { ...state, selectedPatient };
    default:
      return state;
  }
}
