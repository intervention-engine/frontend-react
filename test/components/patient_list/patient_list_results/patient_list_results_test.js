import { expect, renderComponent } from '../../../test_helper';
import PatientListResults from '../../../../src/components/PatientList/PatientListResults/PatientListResults';

describe('Patients List Results', () => {
  let component;
  let props;
  let patientsObject;


  beforeEach(() => {
    patientsObject = {"patientEntries":[{"resourceType":"Patient","id":"5706a95ed857152157133643","meta":{"lastUpdated":"2016-04-07T14:39:26-04:00"},"name":[{"family":["Kim"],"given":["Alan"]}],"gender":"male","birthDate":"1940-06-22","address":[{"line":["Rusk Place"],"city":"Fullerton","state":"FL","postalCode":"3313004"}]},{"resourceType":"Patient","id":"5706a95ed857152157133659","meta":{"lastUpdated":"2016-04-07T14:39:26-04:00"},"name":[{"family":["Wagner"],"given":["Virginia"]}],"gender":"female","birthDate":"1936-11-13","address":[{"line":["Butterfield Road"],"city":"Citrus Heights","state":"WA","postalCode":"1524481"}]},{"resourceType":"Patient","id":"5706a95ed857152157133674","meta":{"lastUpdated":"2016-04-07T14:39:26-04:00"},"name":[{"family":["Ruiz"],"given":["Gary"]}],"gender":"male","birthDate":"1940-09-14","address":[{"line":["Loomis Drive"],"city":"Hanford","state":"SC","postalCode":"0772916"}]},{"resourceType":"Patient","id":"5706a95fd85715215713368e","meta":{"lastUpdated":"2016-04-07T14:39:27-04:00"},"name":[{"family":["Robertson"],"given":["Bonnie"]}],"gender":"female","birthDate":"1946-10-05","address":[{"line":["Dakota Court"],"city":"Whittier","state":"AR","postalCode":"3749703"}]},{"resourceType":"Patient","id":"5706a95fd8571521571336ab","meta":{"lastUpdated":"2016-04-07T14:39:27-04:00"},"name":[{"family":["Johnson"],"given":["Bobby"]}],"gender":"male","birthDate":"1943-09-30","address":[{"line":["Hollow Ridge Alley"],"city":"Lake Forest","state":"DE","postalCode":"0635760"}]},{"resourceType":"Patient","id":"5706a95fd8571521571336c5","meta":{"lastUpdated":"2016-04-07T14:39:27-04:00"},"name":[{"family":["Warren"],"given":["Jonathan"]}],"gender":"male","birthDate":"1949-08-05","address":[{"line":["Main Pass"],"city":"Glendale","state":"NC","postalCode":"2531641"}]},{"resourceType":"Patient","id":"5706a95fd8571521571336dd","meta":{"lastUpdated":"2016-04-07T14:39:27-04:00"},"name":[{"family":["Thompson"],"given":["Randy"]}],"gender":"male","birthDate":"1950-07-12","address":[{"line":["Riverside Way"],"city":"Los Altos","state":"TX","postalCode":"8485889"}]},{"resourceType":"Patient","id":"5706a95fd8571521571336f9","meta":{"lastUpdated":"2016-04-07T14:39:27-04:00"},"name":[{"family":["Dunn"],"given":["Catherine"]}],"gender":"female","birthDate":"1933-01-27","address":[{"line":["Arrowood Road"],"city":"Danville","state":"WY","postalCode":"8871337"}]}],"meta":{"total":120,"link":[{"relation":"self","url":"http://localhost:3001/Patient?_offset=0&_count=8"},{"relation":"first","url":"http://localhost:3001/Patient?_offset=0&_count=8"},{"relation":"next","url":"http://localhost:3001/Patient?_offset=8&_count=8"},{"relation":"last","url":"http://localhost:3001/Patient?_offset=112&_count=8"}]}};
    props = {
      patients: patientsObject
    };
    component = renderComponent(PatientListResults, props, {});
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-results');
  });


  it('displays the proper patient count', () => {
    expect(component.find('.patient-count')).to.have.text('Patients (120)');
  });

  it('displays the correct number of patientListResultItems', () => {
    expect(component.find('.patient-info').length).to.equal(8);
  });
});
