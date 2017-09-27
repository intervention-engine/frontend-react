import { fetchPatients } from './patient';

import {
  SELECT_SORT_OPTION,
  SET_SORT_ASCENDING
} from './types';

// ------------------------- SELECT SORT OPTION ---------------------------- //

export function selectSortOption(sortOption) {
  return (dispatch) => {
    dispatch({ type: SELECT_SORT_OPTION, sortOption });
    return dispatch(fetchPatients());
  };
}

// ------------------------- SET SORT ASCENDING ---------------------------- //

export function setSortAscending(bool) {
  return (dispatch) => {
    dispatch({ type: SET_SORT_ASCENDING, bool });
    return dispatch(fetchPatients());
  };
}
