import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import populationReducer from './population';

const rootReducer = combineReducers({
  routing: routeReducer,
  population: populationReducer
});

export default rootReducer;
