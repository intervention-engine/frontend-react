import { PropTypes } from 'react';

const populationProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    createdOn: PropTypes.string,
    lastUpdatedOn: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  characteristic: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.shape({
      coding: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        code: PropTypes.string,
        userSelected: PropTypes.bool
      })).isRequired,
      text: PropTypes.string
    }),
    valueCodeableConcept: PropTypes.shape({
      coding: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        code: PropTypes.string,
        userSelected: PropTypes.bool
      }))
    }),
    valueBoolean: PropTypes.bool,
    valueRange: PropTypes.shape({
      low: PropTypes.shape({
        value: PropTypes.number
      }),
      high: PropTypes.shape({
        value: PropTypes.number
      })
    }),
    exclude: PropTypes.bool
  }))
};

export default PropTypes.shape(populationProps);
