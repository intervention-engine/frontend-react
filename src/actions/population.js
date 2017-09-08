import axios from 'axios';

import {
  FETCH_POPULATIONS,
  FETCH_POPULATION,
  SELECT_POPULATION,
  UNSELECT_POPULATION,
  CHANGE_POPULATION_SELECTOR_TYPE
} from './types';

export function fetchPopulations() {
  const FETCH_POPULATIONS_URL = `${FHIR_SERVER}/Group?actual=false`;
  return {
    type: FETCH_POPULATIONS,
    payload: axios.get(FETCH_POPULATIONS_URL)
  };
}

export function fetchPopulation(id) {
  const FETCH_POPULATIONS_URL = `${FHIR_SERVER}/api/populations/${id}`;
  return {
    type: FETCH_POPULATION,
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

export function changePopulationSelectorType(type) {
  return {
    type: CHANGE_POPULATION_SELECTOR_TYPE,
    payload: type
  };
}
