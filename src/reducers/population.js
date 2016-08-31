import {
  FETCH_POPULATIONS_RESOLVED,
  SELECT_POPULATION
} from '../actions/types';

export default function populationReducer(state = { populations: [], selectedPopulation: null }, action)  {
  switch (action.type) {
    case FETCH_POPULATIONS_RESOLVED:
      return { ...state, populations: action.payload };
    case SELECT_POPULATION:
      return { ...state, selectedPopulation: action.payload };
    default:
      return state;
  }
}
