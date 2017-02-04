import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1 } from '../../../test_props';
import PatientViewTimelineEvent from '../../../../src/components/PatientView/PatientViewTimeline/PatientViewTimelineEvent';

describe('Patient View Timeline Event' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1,
      event: { type: 'condition', displayText: 'Test Condition', startDate: '2017-01-01' }
    }

    component = renderComponent(PatientViewTimelineEvent, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-timeline-event');
  });

  it('displays the correct icon', () => {
    expect(component.find('.timeline-event-icon:eq(0) i')).to.have.class('fc-med-clipboard');
  });

  it('displays the correct title', () => {
    expect(component.find('.timeline-event-text:eq(0) div')).to.have.text('Test Condition');
  });

  it('displays the correct date', () => {
    expect(component.find('.timeline-event-date:eq(0) div')).to.have.text('Jan 1, 2017 12:00 AM');
  });
});
