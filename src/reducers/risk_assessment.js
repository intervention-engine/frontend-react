import {
  FETCH_RISK_ASSESSMENTS_FULFILLED
} from '../actions/types';

export default function riskServiceReducer(state = { riskAssessments: [],
                                                     selectedRiskAssessment: null }, action)  {
  switch (action.type) {
    case FETCH_RISK_ASSESSMENTS_FULFILLED:
      return { ...state, riskAssessments: action.payload || [] };
    default:
      return state;
  }
}
