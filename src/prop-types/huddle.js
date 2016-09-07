import { PropTypes } from 'react';

const huddleProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    profile: PropTypes.arrayOf(PropTypes.string)
  }),
  extension: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    valueDateTime: PropTypes.string,
    valueReference: PropTypes.shape({
      reference: PropTypes.string
    })
  })),
  name: PropTypes.string.isRequired
};

export default PropTypes.shape(huddleProps);
