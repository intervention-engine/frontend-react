import { combineReducers } from 'redux';

import {
  SELECT_SORT_OPTION,
  SET_SORT_ASCENDING
} from '../actions/types';

export const sortOptions = [
  { id: '1', name: 'Name', sortKey: 'name,birthdate', sortIcon: 'alpha', invert: false, defaultSortAscending: true },
  { id: '2', name: 'Age', sortKey: 'birthdate,name', sortIcon: 'numeric', invert: true, defaultSortAscending: true },
  { id: '3', name: 'Gender', sortKey: 'gender,name', sortIcon: 'alpha', invert: false, defaultSortAscending: true }
  // { id: '4', name: 'Location', sortKey: 'address,name', sortIcon: 'alpha', invert: false, defaultSortAscending: true },
  // { id: '5', name: 'Risk Score', sortKey: 'riskScore,name', sortIcon: 'numeric', invert: false, defaultSortAscending: false },
  // { id: '6', name: 'Notifications', sortKey: 'notifications,name', sortIcon: 'numeric', invert: false, defaultSortAscending: false }
];

const DEFAULT_SORT_OPTION = sortOptions[0];
const DEFAULT_SORT_ASCENDING = sortOptions[0].defaultSortAscending;

// ------------------------- SELECT SORT OPTION ---------------------------- //

function selectedSortOption(state = DEFAULT_SORT_OPTION, action) {
  switch(action.type) {
    case SELECT_SORT_OPTION:
      return action.sortOption;
    default:
      return state;
  }
}

// ------------------------- SET SORT ASCENDING ---------------------------- //

function sortAscending(state = DEFAULT_SORT_ASCENDING, action) {
  switch(action.type) {
    case SET_SORT_ASCENDING:
      return action.bool;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedSortOption,
  sortAscending
});

export default rootReducer;
