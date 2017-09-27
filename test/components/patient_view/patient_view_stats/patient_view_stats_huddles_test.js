import moment from 'moment';
import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, careTeamTestObject1, huddleTestObject } from '../../../test_props';
import PatientViewStatsHuddles from '../../../../src/components/PatientView/PatientViewStats/PatientViewStatsHuddles';

describe('Patient View Stats Huddles' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      huddles: [ careTeamTestObject1 ],
      selectedHuddle: huddleTestObject,
      selectHuddle: () => null,
      addPatientToHuddle: () => null
    }

    component = renderComponent(PatientViewStatsHuddles, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats-huddles');
  });

  it('displays the panel title correctly', () => {
    expect(component.find('.panel-title')).to.have.text(' Huddles ');
  });

  it('contains a pikaday calendar', () => {
    expect(component.find('.pikaday-container')).to.exist;
  });

  it('defaults to todays date', () => {
    let today = moment(new Date()).format('MMM D, YYYY');
    expect(component.find('.patient-view-stats-huddles-details-date')).to.have.text(today);
  });
});
