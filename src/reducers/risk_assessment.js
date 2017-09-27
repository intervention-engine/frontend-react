import { combineReducers } from 'redux';

import {
  REQUEST_RISK_ASSESSMENTS,
  RECEIVE_RISK_ASSESSMENTS,
  REQUEST_RISK_BREAKDOWN,
  RECEIVE_RISK_BREAKDOWN,
  SELECT_RISK_ASSESSMENT
} from '../actions/types';

// ------------------------- RISK ASSESSMENTS ------------------------------ //

function riskAssessments(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
    case REQUEST_RISK_ASSESSMENTS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_RISK_ASSESSMENTS:
      return Object.assign({}, state, { isFetching: false, items: action.riskAssessments });
    default:
      return state;
  }
}

// ------------------------- RISK BREAKDOWN -------------------------------- //

function riskBreakdown(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
    case REQUEST_RISK_BREAKDOWN:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_RISK_BREAKDOWN:
      return Object.assign({}, state, { isFetching: false, items: action.riskBreakdown });
    default:
      return state;
  }
}

// ------------------------- SELECT RISK ASSESSMENT ------------------------ //

function selectedRiskAssessment(state = null, action) {
  switch(action.type) {
    case SELECT_RISK_ASSESSMENT:
      return action.riskAssessment;
    case RECEIVE_RISK_ASSESSMENTS:
      return action.riskAssessments[0];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  riskAssessments,
  riskBreakdown,
  selectedRiskAssessment
});

export default rootReducer;
