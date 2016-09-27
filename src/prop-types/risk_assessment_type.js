import { PropTypes } from 'react';

const riskAssessmentTypeProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired
};

export default PropTypes.shape(riskAssessmentTypeProps);
