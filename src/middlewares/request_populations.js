// Restructures the response of the Group endpoint for use in populations
import {
  FETCH_POPULATIONS_FULFILLED,
  FETCH_POPULATIONS_RESOLVED
} from '../actions/types';

function restructureAndFilter(populations, payload) {
  let { resource } = payload;
  if (resource.actual === false) {
    populations.push({
      id: resource.id,
      meta: resource.meta,
      name: resource.name,
      characteristic: resource.characteristic
    });
  }

  return populations;
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_POPULATIONS_FULFILLED:
        dispatch({ type: FETCH_POPULATIONS_RESOLVED, payload: action.payload.data.entry.reduce(restructureAndFilter, []) })
        return;
    }

    return next(action);
  };
}
