import {
  FETCH_RISK_ASSESSMENTS_RESOLVED,
  SELECT_RISK_ASSESSMENT
} from '../actions/types';

export default function riskAssessmentReducer(state = { riskAssessments: [],
                                                        selectedRiskAssessment: null }, action)  {
  switch (action.type) {
    case FETCH_RISK_ASSESSMENTS_RESOLVED:
      return { ...state, riskAssessments: action.payload };
    case SELECT_RISK_ASSESSMENT:
      return { ...state, selectedRiskAssessment: action.payload };
    default:
      return state;
  }
}
