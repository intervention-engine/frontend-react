import { PropTypes } from 'react';

const patientsMetaProps = {
  total: PropTypes.number,
  link: PropTypes.arrayOf(PropTypes.shape({
    relation: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }))
};

export default PropTypes.shape(patientsMetaProps);
