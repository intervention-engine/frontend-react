import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import populationsReducer from './population';

const rootReducer = combineReducers({
  routing: routeReducer,
  populations: populationsReducer
});

export default rootReducer;
