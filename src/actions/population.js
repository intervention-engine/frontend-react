import axios from 'axios';

import {
  FETCH_POPULATIONS,
  FETCH_POPULATION,
  SELECT_POPULATION,
  UNSELECT_POPULATION,
  CHANGE_POPULATION_SELECTOR_TYPE,
  SAVE_POPULATION,
  GET_INSTACOUNT
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

 export function savePopulation(filter) {
   return {
     type: SAVE_POPULATION,
     payload: filter
   };
 }

 export function getInstaCount(filter) {
   return {
     type: GET_INSTACOUNT,
     payload: filter
   };
 }
