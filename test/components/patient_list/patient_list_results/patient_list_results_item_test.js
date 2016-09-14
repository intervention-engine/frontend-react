import moment from 'moment';
import { expect, renderComponent } from '../../../test_helper';
import PatientListResultsItem from '../../../../src/components/PatientListResults/PatientListResultsItem';

describe('Patients List Results Item', () => {
	let patient;
	let component;
	let props;

	beforeEach(() => {
		patient = {"resourceType":"Patient","id":"5706a95ed857152157133643","meta":{"lastUpdated":"2016-04-07T14:39:26-04:00"},"name":[{"family":["Kim"],"given":["Alan"]}],"gender":"male","birthDate":"1940-06-22","address":[{"line":["Rusk Place"],"city":"Fullerton","state":"FL","postalCode":"3313004"}]};
		props = {patient: patient};
		component = renderComponent(PatientListResultsItem, props);
	});



	it('has the correct class', () => {
		expect(component).to.have.class('patient-info');
	});

	it('displays patient name correctly', () => {
		expect(component.find('.patient-name')).to.have.text('Kim, Alan');
	});

	it('displays patient gender correctly', () => {
		// Because we are looking for a child element we use the child selector to find a span that is a child of a thing with the class patient-gender
		expect(component.find('.patient-gender>span')).to.have.class('fa-male');
	});

	it('displays patient age correctly', () => {
		const expectedAge = moment().diff(moment(patient.birthDate), 'years');
		expect(component.find('.patient-age')).to.have.text(`${expectedAge} yrs`);
		expect(component.find('.patient-age>span')).to.have.class('fa-elderly');
	});
});
