import { PropTypes } from 'react';

const huddleProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    profile: PropTypes.string
  }).isRequired,
  extension: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    valueDateTime: PropTypes.string,
    valueReference: PropTypes.shape({
      reference: PropTypes.string
    })
  })).isRequired,
  name: PropTypes.string.isRequired
};

export default PropTypes.shape(huddleProps);
