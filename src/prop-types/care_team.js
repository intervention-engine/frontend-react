import { PropTypes } from 'react';

const careTeamProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  leader: PropTypes.string
};

export default PropTypes.shape(careTeamProps);
