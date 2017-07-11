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
      let total = parseInt(action.payload.headers.link.match(/total=(\d+)/i)[1]);

      return { ...state, patients: action.payload.data || [],
                         meta: { total },
                         pageNum: Math.ceil(total / state.patientsPerPage) };
    case SET_PATIENT_SEARCH:
      // reset the page to 1 so the search results are shown
      return { ...state, patientSearch: action.payload, currentPage: 1 };
    case SELECT_PAGE:
      return { ...state, currentPage: action.payload };
    case FETCH_PATIENT_FULFILLED:
      let selectedPatient = { ...action.payload.data };
      return { ...state, selectedPatient };
    default:
      return state;
  }
}
