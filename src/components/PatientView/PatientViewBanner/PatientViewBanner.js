import React from 'react';
import patientProps from '../../../prop-types/patient';


import PatientViewBannerSummary from './PatientViewBannerSummary';

const PatientViewBanner = ({ patient }) => {
	if (patient) {
		return (
			<div>
				<PatientViewBannerSummary patient={patient} />
			</div>
		);
	}
	return (
		<div>
		</div>
	);
};

PatientViewBanner.propTypes = {
	patient: patientProps.isRequired
};

export default PatientViewBanner;
