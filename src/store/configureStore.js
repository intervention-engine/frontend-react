import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import requestHuddlesMiddleware from '../middlewares/request_huddles';
import requestRiskAssessmentsMiddleware from '../middlewares/request_risk_assessments';
import requestPatientsMiddleware from '../middlewares/request_patients';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestPopulationsMiddleware,
    requestHuddlesMiddleware,
    requestRiskAssessmentsMiddleware,
    requestPatientsMiddleware
  );

  let store = createStore(rootReducer, initialState, middleware);

  return store;
}
