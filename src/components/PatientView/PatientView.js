import React from 'react';

import PatientViewBanner from './PatientViewBanner/PatientViewBanner';

const PatientView = ({patient}) => {
	return (
		<div>
			<PatientViewBanner patient={patient} />
		</div>
	);
};

export default PatientView;
