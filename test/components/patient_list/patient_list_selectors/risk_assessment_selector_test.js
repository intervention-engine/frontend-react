import { expect, renderComponent } from '../../../test_helper';
import { riskServiceTestObject1, riskServiceTestObject2 } from '../../../test_props';
import RiskServiceSelector from '../../../../src/components/PatientList/PatientListSelectors/RiskServiceSelector';

describe('RiskServiceSelector' , () => {
  let component;
  let selectedRiskService;

  beforeEach(() => {
    selectedRiskService = riskServiceTestObject1;

    let props = {
      riskServices: [ riskServiceTestObject1, riskServiceTestObject2 ],
      selectedRiskService,
      selectRiskService(riskService) { selectedRiskService = riskService; }
    };

    component = renderComponent(RiskServiceSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('risk-service-selector');
  });

  it('displays the correct risk service name', () => {
    expect(component.find(".risk-service-name").first()).to.have.text('Sample Risk Service 1');
  });

  it('can select a risk assessment', () => {
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(selectedRiskService).to.eq(riskServiceTestObject2);
  });
});
