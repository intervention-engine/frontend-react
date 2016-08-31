import {
  FETCH_POPULATIONS_FULFILLED
  // SELECT_POPULATION
} from '../actions/types';

export default function(state = [], action)  {
  switch (action.type) {
    case FETCH_POPULATIONS_FULFILLED:
      return action.payload;
    // case SELECT_POPULATION:
    //   let clonedState = Object.assign({}, state);
    //   clonedState.forEach((population) => population.selected = false);
    //   clonedState[action.payload].selected = true;
    //   return clonedState;
    default:
      return state;
  }
}
