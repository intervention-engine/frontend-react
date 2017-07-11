import { PropTypes } from 'react';

const riskServiceProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default PropTypes.shape(riskServiceProps);
