import {
	FETCH_PATIENTS_FULFILLED,
	FETCH_PATIENTS_RESOLVED
} from '../actions/types';


function extractResources(response) {
	return response.entry.map((entry) => {
		return entry.resource;
	});
}

function extractMeta(response) {
	let { total, link } = response;
	return {total, link};
}


export default function ({ dispatch }) {
	return next => action => {
		switch (action.type) {
			case FETCH_PATIENTS_FULFILLED:
				let payload = {
					meta: extractMeta(action.payload.data),
					patients: extractResources(action.payload.data)
				};
				dispatch({type: FETCH_PATIENTS_RESOLVED, payload});
			return;
		}
		return next(action);
	};
}
