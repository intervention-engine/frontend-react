import { PropTypes } from 'react';

const riskAssessmentBreakdownProps = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  max_value: PropTypes.number.isRequired
};

export default PropTypes.shape(riskAssessmentBreakdownProps);
