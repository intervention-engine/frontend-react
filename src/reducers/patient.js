import {
  FETCH_PATIENTS_RESOLVED,
  SET_PATIENT_SEARCH
} from '../actions/types';

export default function(state = { patients: [], meta: {}, patientSearch: '' }, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_RESOLVED:
      return { ...state, patients: action.payload.patients,
                         meta: action.payload.meta };
    case SET_PATIENT_SEARCH:
      return { ...state, patientSearch: action.payload };
    default:
      return state;
  }
}
