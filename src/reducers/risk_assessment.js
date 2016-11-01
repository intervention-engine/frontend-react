import {
  FETCH_PATIENTS_FULFILLED,
  SELECT_RISK_ASSESSMENT
} from '../actions/types';

export const riskAssessmentTypes = [
  { id: '1', name: 'Catastrophic Health Event', method: 'MultiFactor' },
  { id: '2', name: 'Test Risk Assessment', method: 'TestMethod' }
];

const DEFAULT_SELECTED_RISK_ASSESSMENT = riskAssessmentTypes[0];

export default function riskAssessmentReducer(state = {
  riskAssessments: [],
  selectedRiskAssessment: DEFAULT_SELECTED_RISK_ASSESSMENT
}, action)  {
  switch (action.type) {
    case FETCH_PATIENTS_FULFILLED:
      return { ...state, riskAssessments: action.payload.data.RiskAssessment };
    case SELECT_RISK_ASSESSMENT:
      return { ...state, selectedRiskAssessment: action.payload };
    default:
      return state;
  }
}
