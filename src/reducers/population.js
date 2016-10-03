import _ from 'lodash';
import {
  FETCH_POPULATIONS_RESOLVED,
  SELECT_POPULATION,
  UNSELECT_POPULATION,
  CHANGE_POPULATION_SELECTOR_TYPE
} from '../actions/types';

export default function populationReducer(state = { populations: [],
                                                    selectedPopulations: [],
                                                    populationSelectorType: 'union' }, action) {
  switch (action.type) {
    case FETCH_POPULATIONS_RESOLVED:
      return { ...state, populations: action.payload };
    case SELECT_POPULATION:
      let newSelectedPopulations = _.concat(state.selectedPopulations, action.payload);
      return { ...state, selectedPopulations: newSelectedPopulations };
    case UNSELECT_POPULATION:
      let newSelectedPop = _.pull(state.selectedPopulations.slice(), action.payload);
      return { ...state, selectedPopulations: newSelectedPop };
    case CHANGE_POPULATION_SELECTOR_TYPE:
      return { ...state, populationSelectorType: action.payload };
    default:
      return state;
  }
}
