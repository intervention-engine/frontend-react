import {
  SELECT_SORT_OPTION
} from '../actions/types';

const DEFAULT_SORT_OPTION = { id: 1, name: 'Name', sortKey: 'name,birthdate', sortIcon: 'alpha', invert: false, defaultSortDescending: false };

export default function sortReducer(state = { sortOption: DEFAULT_SORT_OPTION }, action)  {
  switch (action.type) {
    case SELECT_SORT_OPTION:
      return { ...state, sortOption: action.payload };
    default:
      return state;
  }
}
