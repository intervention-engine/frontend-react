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

export default function sortReducer(state = { sortOption: DEFAULT_SORT_OPTION,
                                              sortAscending: DEFAULT_SORT_ASCENDING }, action)  {
  switch (action.type) {
    case SELECT_SORT_OPTION:
      return { ...state, sortOption: action.payload, sortAscending: action.payload.defaultSortAscending };
    case SET_SORT_ASCENDING:
      return { ...state, sortAscending: action.payload};
    default:
      return state;
  }
}
