import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import requestBundlesMiddleware from '../middlewares/request_bundles';
import requestHuddlesMiddleware from '../middlewares/request_huddles';
import requestPatientsMiddleware from '../middlewares/request_patients';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import requestRiskAssessmentsMiddleware from '../middlewares/request_risk_assessments';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestBundlesMiddleware,
    requestHuddlesMiddleware,
    requestPatientsMiddleware,
    requestPopulationsMiddleware,
    requestRiskAssessmentsMiddleware
  );

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(rootReducer, initialState, composeEnhancers(middleware));

  return store;
}
