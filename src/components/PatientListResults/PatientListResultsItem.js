import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const PatientListResultsItem = ({name, age, gender}) => {
	let genderIconClassName = 'fa-user';
	if (gender === 'Male') {
		genderIconClassName = 'fa-male';
	} else if (gender === 'Female') {
		genderIconClassName = 'fa-female';
	}


	return (
		<div className='patient-info patient-media'>
			<div className='media'>
				<div className='media-left media-middle'>
					<FontAwesome name='fa-user'/>
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
								<FontAwesome name='fa-elderly'/>
								{age} yrs
							</span>
							<span className='patient-gender'>
								<FontAwesome name={genderIconClassName}/>
								{gender}
							</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

PatientListResultsItem.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired,
	gender: PropTypes.string.isRequired
};

PatientListResultsItem.displayName = 'PatientListResultsItem';

export default PatientListResultsItem;
