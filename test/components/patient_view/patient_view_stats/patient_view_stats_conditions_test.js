import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1 } from '../../../test_props';
import PatientViewStatsConditions from '../../../../src/components/PatientView/PatientViewStats/PatientViewStatsConditions';

describe('Patient View Stats Conditions' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patient: patientTestObject1
    }

    component = renderComponent(PatientViewStatsConditions, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats-conditions');
  });

  xit('displays the panel title correctly', () => {
    expect(component.find('.panel-title')).to.have.text(' Conditions (1)');
  });

  xit('displays only active conditions', () => {
    expect(component.find('.patient-view-stats-conditions-list')).to.have.text('Pulmonary Heart Disease');
    expect(component.find('.patient-view-stats-conditions-list')).not.to.have.text('Urinary Tract Infection');
  });

  xit('displays only unique conditions', () => {
    expect(component.find('.patient-view-stats-conditions-list .condition')).to.have.lengthOf(1);
  });
});
