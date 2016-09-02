import _ from 'lodash';
import {
  FETCH_POPULATIONS_RESOLVED,
  SELECT_POPULATION,
  UNSELECT_POPULATION
} from '../actions/types';

export default function populationReducer(state = { populations: [], selectedPopulations: [] }, action)  {
  switch (action.type) {
    case FETCH_POPULATIONS_RESOLVED:
      return { ...state, populations: action.payload };
    case SELECT_POPULATION:
      let newSelectedPopulations = _.concat(state.selectedPopulations, action.payload);
      return { ...state, selectedPopulations: newSelectedPopulations };
    case UNSELECT_POPULATION:
      let newSelectedPop = _.pull(state.selectedPopulations.slice(), action.payload);
      return { ...state, selectedPopulations: newSelectedPop };
    default:
      return state;
  }
}
