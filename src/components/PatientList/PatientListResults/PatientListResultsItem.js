import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

const PatientListResultsItem = ({patient}) => {
	const { gender } = patient;
	const age = moment().diff(moment(patient.birthDate), 'years');
	// TODO This isn't a viable way to extract names
	const name = `${patient.name[0].family}, ${patient.name[0].given}`;

	let genderIconClassName = 'user';
	if (gender === 'male') {
		genderIconClassName = 'male';
	} else if (gender === 'female') {
		genderIconClassName = 'female';
	}


	return (
		<div className='patient-info patient-media'>
			<div className='media'>
				<div className='media-left media-middle'>
					<FontAwesome name='user'/>
				</div>
			</div>
			<div className='media-body'>
				<div className='row'>
					<div className='patient-name col-xs-12'>
						{name}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<div className='patient-age-gender-location'>
							<span className='patient-age'>
								<FontAwesome name='elderly'/>
								{age} yrs
							</span>
							<span className='patient-gender'>
								<FontAwesome name={genderIconClassName}/> {gender}
							</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

PatientListResultsItem.propTypes = {
	patient: PropTypes.object.isRequired
};

PatientListResultsItem.displayName = 'PatientListResultsItem';

export default PatientListResultsItem;
