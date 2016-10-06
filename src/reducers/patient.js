import {
  FETCH_PATIENTS_RESOLVED,
  SET_PATIENT_SEARCH,
  SELECT_PAGE,
  FETCH_PATIENT_RESOLVED,
  SELECT_PATIENT
} from '../actions/types';

export default function(state = { patients: [],
                                  meta: {},
                                  patientSearch: '',
                                  pageNum: 1,
                                  selectedPatient: {},
                                  currentPage: 1,
                                  patientsPerPage: 10 }, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_RESOLVED:
      return { ...state, patients: action.payload.patients,
                         meta: action.payload.meta,
                         pageNum: Math.ceil(action.payload.meta.total / state.patientsPerPage) };
    case SET_PATIENT_SEARCH:
      return { ...state, patientSearch: action.payload };
    case SELECT_PAGE:
      return { ...state, currentPage: action.payload };
    case FETCH_PATIENT_RESOLVED:
      let { encounter, condition, medicationStatement, riskAssessment } = action.payload;
      selectedPatient = {...action.payload.patient, encounter, condition, medicationStatement, riskAssessment};
      return { ...state, selectedPatient};
    case SELECT_PATIENT:
      let selectedPatient = state.patients.find((pat) => pat.id===action.payload );
      return {...state, selectedPatient};
    default:
      return state;
  }
}
