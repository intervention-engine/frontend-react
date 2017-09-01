import { PropTypes } from 'react';

const huddleProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  datetime: PropTypes.string,
  practioner: PropTypes.string,
  patients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    reason: PropTypes.shape({
      code: PropTypes.string,
      text: PropTypes.string
    }),
    reviewed: PropTypes.string
  }))
};

export default PropTypes.shape(huddleProps);
