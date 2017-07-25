import {
  FETCH_RISK_SERVICES_FULFILLED,
  SELECT_RISK_SERVICE
} from '../actions/types';

export default function riskServiceReducer(state = { riskServices: [],
                                                     selectedRiskService: null }, action)  {
  switch (action.type) {
    case FETCH_RISK_SERVICES_FULFILLED:
      return { ...state, riskServices: action.payload.data || [], selectedRiskService: action.payload.data[0] };
    case SELECT_RISK_SERVICE:
      return { ...state, selectedRiskService: action.payload };
    default:
      return state;
  }
}
