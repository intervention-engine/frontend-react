import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1 } from '../../../test_props';
import PatientViewTimeline from '../../../../src/components/PatientView/PatientViewTimeline/PatientViewTimeline';

describe('Patient View Timeline' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1
    }

    component = renderComponent(PatientViewTimeline, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-timeline');
  });

  it('has a timeline search', () => {
    expect(component.find('.search-timeline')).to.exist;
  });

  it('displays the correct number of timeline events', () => {
    expect(component.find('.patient-view-timeline-event').length).to.equal(6);
  });
});
