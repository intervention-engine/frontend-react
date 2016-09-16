import { expect, renderComponent } from '../../../../../test_helper';
import HuddleFilterDateSelectorRedux, { HuddleFilterDateSelector, mapStateToProps } from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterDateSelector';

describe('HuddleFilterDateSelector' , () => {
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

    component = renderComponent(HuddleFilterDateSelectorRedux, {}, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-date-selector');
  });

  it('maps state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.huddles.length).to.equal(1);
    expect(stateProps.selectedHuddleGroup).to.equal(huddleGroupObject);
    expect(stateProps.selectedHuddle).to.equal(huddleObject);
  });

  it('displays the selected huddle date', () => {
    expect(component.find(".huddle-date").first()).to.have.text('2099-01-01');
  });
});
