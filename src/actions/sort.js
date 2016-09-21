import axios from 'axios';

import {
  SELECT_SORT_OPTION
} from './types';

export function selectSortOption(sortOption) {
  return {
    type: SELECT_SORT_OPTION,
    payload: sortOption
  };
}
