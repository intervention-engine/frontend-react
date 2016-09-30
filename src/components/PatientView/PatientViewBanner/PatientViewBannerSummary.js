import React from 'react';

const PatientViewBannerSummary = ({ patient }) => {
	let genderIconClassName = 'user';
	if (patient.gender === 'male') {
		genderIconClassName = 'male';
	} else if (patient.gender === 'female') {
		genderIconClassName = 'female';
	}
	return (
		<div className="media">
			<div className="media-left media-middle">
				<i className="fa fa-user media-object"></i>
			</div>
			<div className="media-body media-middle">
				<div className="row">
					<div className="col-xs-6">
						<div className="patient-name">
						Patient.name
						</div>

						<span className="patient-age">
							<i className={'ageIconClassName'}></i>
							Age yrs
						</span>

						<span className="patient-gender">
							<i className="fa {genderIconClassName}"></i>
							{patient.gender}
						</span>
					</div>

					<div className="col-xs-5 patient-risk-chart">

					</div>

					<div className="col-xs-1">

					</div>
				</div>
			</div>
		</div>

	);
};

export default PatientViewBannerSummary;
