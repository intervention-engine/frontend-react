import { expect, renderComponent } from '../../../test_helper';
import { riskServiceTestObject1 } from '../../../test_props';
import PatientViewStatsRiskService from '../../../../src/components/PatientView/PatientViewStats/PatientViewStatsRiskService';

describe('Patient View Stats Risk Service' , () => {
  let component;

  beforeEach(() => {
    let props = {
      riskServices: [ riskServiceTestObject1 ],
      selectedRiskService: riskServiceTestObject1,
      selectRiskService: () => null
    }

    component = renderComponent(PatientViewStatsRiskService, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-view-stats-risk-service');
  });

  it('displays the panel title correctly', () => {
    expect(component.find('.panel-title')).to.have.text(' Risk Service ');
  });
});
