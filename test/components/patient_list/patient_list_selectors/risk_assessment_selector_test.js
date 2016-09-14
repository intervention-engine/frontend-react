import { expect, renderComponent } from '../../../test_helper';
import RiskAssessmentSelectorRedux, { RiskAssessmentSelector, mapStateToProps } from '../../../../src/components/PatientList/PatientListSelectors/RiskAssessmentSelector';

describe('RiskAssessmentSelector' , () => {
  let component;
  let riskAssessmentObject;
  let state;

  beforeEach(() => {
    riskAssessmentObject = {
      'id': '1',
      'name': 'Sample Risk Assessment',
      'patients': [ { 'id': '2',
                      'value': 2,
                      'pie': 'pieURL' } ] }

    state = {
      riskAssessment: {
        riskAssessments: [ riskAssessmentObject ],
        selectedRiskAssessment: riskAssessmentObject
      }
    };

    component = renderComponent(RiskAssessmentSelectorRedux, {}, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('risk-assessment-selector');
  });

  it('maps state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.riskAssessments.length).to.equal(1);
    expect(stateProps.selectedRiskAssessment).to.equal(riskAssessmentObject);
  });

  it('displays the risk assessment name', () => {
    expect(component.find(".risk-assessment-name").first()).to.have.text('Sample Risk Assessment');
  });

  it('can select a risk assessment', () => {
    let executed = false;
    let props = {
      riskAssessments: [ riskAssessmentObject ],
      selectedRiskAssessment: null,
      fetchRiskAssessments() {},
      selectRiskAssessment(riskAssessment) { executed = (riskAssessment === riskAssessmentObject); }
    };

    let component = renderComponent(RiskAssessmentSelector, props);
    component.find('input[type=radio]').simulate('change');
    expect(executed).to.be.true;
  });
});
