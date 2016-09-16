import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import populationReducer from './population';
import huddleReducer from './huddle';
import riskAssessmentReducer from './risk_assessment';

const rootReducer = combineReducers({
  routing: routeReducer,
  population: populationReducer,
  huddle: huddleReducer,
  riskAssessment: riskAssessmentReducer
});

export default rootReducer;
