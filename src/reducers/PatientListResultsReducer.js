export default function(state = {patientEntries: [], meta:{}}, action)  {
  switch (action.type) {
    case 'LOAD_PATIENTS_FULFILLED':
      const patientEntries = action.payload.data.entry.map((e) => e.resource);
      const { total, link } = action.payload.data;
      const meta = { total,link };
      return {patientEntries, meta};
    default:
      return state;
  }
}
