import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import requestHuddleMiddleware from '../middlewares/request_huddles';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    requestPopulationsMiddleware,
    requestHuddleMiddleware
  );
  
  let store = createStore(rootReducer, initialState, middleware);

  return store;
}
