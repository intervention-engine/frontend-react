import { PropTypes } from 'react';

const huddleProps = {
  id: PropTypes.string,
  date: PropTypes.string,
  care_team_id: PropTypes.string,
  patients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    reason: PropTypes.string,
    reason_type: PropTypes.string,
    reviewed: PropTypes.boolean,
    reviewed_at: PropTypes.string
  }))
};

export default PropTypes.shape(huddleProps);
