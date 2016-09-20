import { FETCH_PATIENTS_FULFILLED } from '../actions/types';

export default function(state = {patients: [], meta:{}}, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_FULFILLED:
      const { entry: entries = [] } = action.payload.data;
      const patients = entries.map((e) => e.resource);
      const { total, link } = action.payload.data;
      const meta = { total,link };
      return {patients, meta};
    default:
      return state;
  }
}
