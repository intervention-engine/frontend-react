import { PropTypes } from 'react';

const patientProps = {
  id: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.shape({
    family: PropTypes.string.isRequired,
    given: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired
  }).isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired
  }).isRequired
};

export default PropTypes.shape(patientProps);
