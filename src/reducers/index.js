import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import populationReducer from './population';
import huddleReducer from './huddle';

const rootReducer = combineReducers({
  routing: routeReducer,
  population: populationReducer,
  huddle: huddleReducer
});

export default rootReducer;
