import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';
import requestPopulationsMiddleware from '../middlewares/request_populations';

export default function configureStore(initialState) {
  let middleware = applyMiddleware(promiseMiddleware(), requestPopulationsMiddleware);
  let store = createStore(rootReducer, initialState, middleware);

  return store;
}
