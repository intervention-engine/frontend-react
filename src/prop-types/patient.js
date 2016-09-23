import { PropTypes } from 'react';

const patientListResultsItemShape = {
	id: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
	birthDate: PropTypes.string.isRequired,
	name: PropTypes.arrayOf(PropTypes.shape({
		family: PropTypes.string.isRequired,
		given: PropTypes.string.isRequired
	}))
};

export const patientListResultsItemProps = PropTypes.shape(patientListResultsItemShape);

const patientListShape = {
	meta: PropTypes.shape({
		total: PropTypes.number.isRequired
	}),
	patients: PropTypes.arrayOf(patientListResultsItemProps)
};

export const patientListProps = PropTypes.shape(patientListShape);
