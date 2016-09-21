import axios from 'axios';

import {
  SELECT_SORT_OPTION,
  SET_SORT_ASCENDING
} from './types';

export function selectSortOption(sortOption) {
  return {
    type: SELECT_SORT_OPTION,
    payload: sortOption
  };
}

export function setSortAscending(bool) {
  return {
    type: SET_SORT_ASCENDING,
    payload: bool
  }
}
