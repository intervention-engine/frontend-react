import { expect, renderComponent } from '../../../../../test_helper';
import HuddleFilterSelectorRedux, { HuddleFilterSelector, mapStateToProps } from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterSelector';

describe('HuddleFilterSelector' , () => {
  let component;
  let huddleObject;
  let huddleGroupObject;
  let state;

  beforeEach(() => {
    huddleGroupObject = {
      'id': '1',
      'name': 'Sample Huddle Group',
      'dates': [ { 'datetime': '2099-01-01',
                   'id': '2',
                   'practioner': 'SamplePractioner',
                   'patients': [ { 'id': '3',
                                   'reason': { 'code': 'SampleReasonCode',
                                               'text': 'SampleReasonText' } } ] } ] };

    huddleObject = {
      'id': '2',
      'datetime': '2099-01-01',
      'practioner': 'SamplePractioner',
      'patients': [ { 'id': '3',
                      'reason': { 'code': 'SampleReasonCode',
                                  'text': 'SampleReasonText' } } ] }

    state = {
      huddle: {
        huddles: [ huddleGroupObject ],
        selectedHuddleGroup: huddleGroupObject,
        selectedHuddle: huddleObject
      }
    };

    component = renderComponent(HuddleFilterSelectorRedux, {}, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-selector');
  });

  it('maps state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.huddles.length).to.equal(1);
    expect(stateProps.selectedHuddleGroup).to.equal(huddleGroupObject);
    expect(stateProps.selectedHuddle).to.equal(huddleObject);
  });

  it('displays the huddle group name', () => {
    expect(component.find(".huddleGroup-name").first()).to.have.text('Sample Huddle Group');
  });

  it('can select a huddle group', () => {
    let executed = false;
    let props = {
      huddles: [ huddleGroupObject ],
      selectedHuddleGroup: null,
      fetchHuddles() {},
      selectHuddleGroup(huddleGroup) { executed = (huddleGroup === huddleGroupObject); }
    };

    let component = renderComponent(HuddleFilterSelector, props);
    component.find('input[type=radio]').simulate('change');
    expect(executed).to.be.true;
  });
});
