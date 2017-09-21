import { combineReducers } from 'redux';

import {
  REQUEST_RISK_SERVICES,
  RECEIVE_RISK_SERVICES,
  SELECT_RISK_SERVICE
} from '../actions/types';

// ------------------------- RISK SERVICES --------------------------------- //

function riskServices(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
    case REQUEST_RISK_SERVICES:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_RISK_SERVICES:
      return Object.assign({}, state, { isFetching: false, items: action.riskServices });
    default:
      return state;
  }
}

// ------------------------- SELECT RISK SERVICE --------------------------- //

function selectedRiskService(state = null, action) {
  switch(action.type) {
    case SELECT_RISK_SERVICE:
      return action.riskService;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  riskServices,
  selectedRiskService
});

export default rootReducer;
