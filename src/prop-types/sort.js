import { PropTypes } from 'react';

const sortProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortIcon: PropTypes.string.isRequired,
  invert: PropTypes.bool.isRequired,
  defaultSortAscending: PropTypes.bool.isRequired
};

export default PropTypes.shape(sortProps);
