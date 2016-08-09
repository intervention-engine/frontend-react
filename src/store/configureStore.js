import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  // creates a Redux store that holds the complete state tree of the app
  let store = createStore(rootReducer, initialState);

  return store;
}
