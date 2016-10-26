// Restructures the response of the Group endpoint for use in populations
import {
  FETCH_POPULATIONS_FULFILLED,
  FETCH_POPULATIONS_RESOLVED
} from '../actions/types';

function restructurePopulation(population) {
  // let { resource } = population;
  return {
    id: population.id,
    meta: population.meta,
    name: population.name,
    characteristic: population.characteristic
  };
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_POPULATIONS_FULFILLED:
        let populations = action.payload.data.Group.map((population) => restructurePopulation(population));
        dispatch({
          type: FETCH_POPULATIONS_RESOLVED,
          payload: populations
        });
        return;
    }

    return next(action);
  };
}
