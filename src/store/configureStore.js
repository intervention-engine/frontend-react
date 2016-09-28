import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import requestHuddlesMiddleware from '../middlewares/request_huddles';
import requestPatientsMiddleware from '../middlewares/request_patients';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import requestRiskAssessmentsMiddleware from '../middlewares/request_risk_assessments';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestHuddlesMiddleware,
    requestPatientsMiddleware,
    requestPopulationsMiddleware,
    requestRiskAssessmentsMiddleware
  );

  let store = createStore(rootReducer, initialState, middleware);

  return store;
}
