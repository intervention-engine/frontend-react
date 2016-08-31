// Restructures the response of the Group endpoint for use in populations
import {
  FETCH_POPULATIONS_FULFILLED
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

// Tells which actions to apply this middleware to
export default function() {
  return next => action => {
    switch (action.type) {
      case FETCH_POPULATIONS_FULFILLED:
        action.payload = action.payload.data.entry.reduce(restructureAndFilter, []);
        break;
    }

    return next(action);
  };
}
