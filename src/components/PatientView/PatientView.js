import React from 'react';
import patientProps from '../../prop-types/patient';

import PatientViewBanner from './PatientViewBanner/PatientViewBanner';

const PatientView = ({patient}) => {
  return (
		<div>
			<PatientViewBanner patient={patient} />
		</div>
	);
};

PatientView.propTypes = {
  patient: patientProps.isRequired
};

export default PatientView;
