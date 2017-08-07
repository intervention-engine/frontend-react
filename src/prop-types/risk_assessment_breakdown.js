import { PropTypes } from 'react';

const riskAssessmentBreakdownProps = {
  risk_assessment_id: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    max_value: PropTypes.number.isRequired
  }))
};

export default PropTypes.shape(riskAssessmentBreakdownProps);
