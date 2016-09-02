import axios from 'axios';

import {
  FETCH_POPULATIONS,
  SELECT_POPULATION,
  UNSELECT_POPULATION
} from './types';

export function fetchPopulations() {
  const FETCH_POPULATIONS_URL = `${FHIR_SERVER}/Group?actual=false`;
  return {
    type: FETCH_POPULATIONS,
    payload: axios.get(FETCH_POPULATIONS_URL)
  };
}

export function selectPopulation(population) {
  return {
    type: SELECT_POPULATION,
    payload: population
  };
}

export function unselectPopulation(population) {
  return {
    type: UNSELECT_POPULATION,
    payload: population
  };
}
