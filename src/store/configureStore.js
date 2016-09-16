import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import requestHuddlesMiddleware from '../middlewares/request_huddles';
import requestRiskAssessmentsMiddleware from '../middlewares/request_risk_assessments';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestPopulationsMiddleware,
    requestHuddlesMiddleware,
    requestRiskAssessmentsMiddleware
  );

  let store = createStore(rootReducer, initialState, middleware);

  return store;
}
