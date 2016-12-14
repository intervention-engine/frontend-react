import { PropTypes } from 'react';

const huddleProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  practioner: PropTypes.string.isRequired,
  patients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    reason: PropTypes.shape({
      code: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    reviewed: PropTypes.string
  })).isRequired
};

export default PropTypes.shape(huddleProps);
