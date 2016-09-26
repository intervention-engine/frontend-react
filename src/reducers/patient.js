import { FETCH_PATIENTS_RESOLVED } from '../actions/types';

export default function(state = { patients: [], meta: {} }, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_RESOLVED:
      return { ...state, patients: action.payload.patients,
                         meta: action.payload.meta };
    default:
      return state;
  }
}
