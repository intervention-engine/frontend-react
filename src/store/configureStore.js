import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import requestBundlesMiddleware from '../middlewares/request_bundles';
import restructureGroupsMiddleware from '../middlewares/restructure_groups';
import restructurePatientsMiddleware from '../middlewares/restructure_patients';
import restructureRiskAssessmentsMiddleware from '../middlewares/restructure_risk_assessments';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestBundlesMiddleware,
    restructureGroupsMiddleware,
    restructurePatientsMiddleware,
    restructureRiskAssessmentsMiddleware
  );

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(rootReducer, initialState, composeEnhancers(middleware));

  return store;
}
