import { PropTypes } from 'react';

const riskAssessmentProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  patients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    risks: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number.isRequired,
      pie: PropTypes.string.isRequired
    }))
  }))
};

export default PropTypes.shape(riskAssessmentProps);
