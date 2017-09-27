import { PropTypes } from 'react';

const patientProps = {
  id: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birth_date: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.shape({
    family: PropTypes.string.isRequired,
    given: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired,
    middle_initial: PropTypes.string
  }).isRequired,
  address: PropTypes.shape({
    street: PropTypes.arrayOf(PropTypes.string).isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postalCode: PropTypes.string
  }).isRequired,
  next_huddle: PropTypes.shape({
    care_team_name: PropTypes.string.isRequired,
    huddle_date: PropTypes.string.isRequired,
    huddle_id: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    reason_type: PropTypes.string.isRequired,
    reviewed: PropTypes.bool.isRequired,
    reviewed_at: PropTypes.string
  }),
  recent_risk_assessment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    risk_service_id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired
};

export default PropTypes.shape(patientProps);
