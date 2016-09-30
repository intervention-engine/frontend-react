import React from 'react';

import PatientViewBannerSummary from './PatientViewBannerSummary';

const PatientViewBanner = ({ patient }) => {
	return (
		<div>
			<PatientViewBannerSummary patient={patient} />
		</div>
	);
};

export default PatientViewBanner;
