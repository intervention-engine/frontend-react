import axios from 'axios';

import {
  FETCH_POPULATIONS
  // SELECT_POPULATION
} from './types';

export function fetchPopulations() {
  const FETCH_POPULATIONS_URL = `${FHIR_SERVER}/Group`;
  return {
    type: FETCH_POPULATIONS,
    payload: axios.get(FETCH_POPULATIONS_URL)
  };
}

// export function selectPopulation(populationId) {
//   return {type: SELECT_POPULATION, populationId: populationId};
// }
