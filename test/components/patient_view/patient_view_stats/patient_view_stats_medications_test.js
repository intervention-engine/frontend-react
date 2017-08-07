import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1 } from '../../../test_props';
import PatientViewStatsMedications from '../../../../src/components/PatientView/PatientViewStats/PatientViewStatsMedications';

describe('Patient View Stats Medications' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1
    }

    component = renderComponent(PatientViewStatsMedications, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats-medications');
  });

  xit('displays the panel title correctly', () => {
    expect(component.find('.panel-title')).to.have.text(' Medications (1)');
  });

  xit('displays only active medications', () => {
    expect(component.find('.patient-view-stats-medications-list')).to.have.text('Sulfamethoxazole/Trimethoprim Oral Tablet');
    expect(component.find('.patient-view-stats-medications-list')).not.to.have.text('Lisinopril 10mg Oral Tablet');
  });

  xit('displays only unique medications', () => {
    expect(component.find('.patient-view-stats-medications-list .medication')).to.have.lengthOf(1);
  });
});
