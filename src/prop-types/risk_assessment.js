import { PropTypes } from 'react';

const riskAssessmentProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    lastUpdated: PropTypes.string
  }),
  date: PropTypes.string, // risk assessment datetime
  subject: PropTypes.shape({
    reference: PropTypes.string.isRequired // patient id
  }),
  method: PropTypes.shape({
    coding: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    })).isRequired,
    text: PropTypes.string.isRequired
  }),
  basis: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string.isRequired // pie chart reference
  })),
  prediction: PropTypes.arrayOf(PropTypes.shape({
    outcome: PropTypes.shape({
      text: PropTypes.string.isRequired // risk assessment name
    }).isRequired,
    probabilityDecimal: PropTypes.number.isRequired // risk assessment value
  }))
};

export default PropTypes.shape(riskAssessmentProps);
