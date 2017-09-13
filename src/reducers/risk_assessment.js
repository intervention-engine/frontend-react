import {
  FETCH_RISK_ASSESSMENTS_FULFILLED,
  SELECT_RISK_ASSESSMENT,
  FETCH_RISK_ASSESSMENT_BREAKDOWN_FULFILLED
} from '../actions/types';

export default function riskServiceReducer(state = { riskAssessments: [],
                                                     selectedRiskAssessment: null,
                                                     riskAssessmentBreakdown: null }, action)  {
  switch (action.type) {
    case FETCH_RISK_ASSESSMENTS_FULFILLED:
      let riskAssessments = action.payload.data || [];
      let selectedRiskAssessment = riskAssessments.length === 0 ? null : riskAssessments[riskAssessments.length - 1];
      return { ...state, riskAssessments, selectedRiskAssessment };
    case SELECT_RISK_ASSESSMENT:
      return { ...state, selectedRiskAssessment: action.payload };
    case FETCH_RISK_ASSESSMENT_BREAKDOWN_FULFILLED:
      return { ...state, riskAssessmentBreakdown: action.payload.data };
    default:
      return state;
  }
}
