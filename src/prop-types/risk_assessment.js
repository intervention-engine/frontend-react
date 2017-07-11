import { PropTypes } from 'react';

const riskAssessmentProps = {
  id: PropTypes.string.isRequired,
  risk_service_id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default PropTypes.shape(riskAssessmentProps);
