import axios from 'axios';

import {
  FETCH_HUDDLES,
  SELECT_HUDDLE
} from './types';

export function fetchHuddles() {
  const FETCH_HUDDLES_URL = `${FHIR_SERVER}/Group?actual=true`;
  return {
    type: FETCH_HUDDLES,
    payload: axios.get(FETCH_HUDDLES_URL)
  };
}

export function selectHuddle(huddle) {
  return {
    type: SELECT_HUDDLE,
    payload: huddle
  };
}
