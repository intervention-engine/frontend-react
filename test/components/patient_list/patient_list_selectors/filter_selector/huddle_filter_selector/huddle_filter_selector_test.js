import { expect, renderComponent } from '../../../../../test_helper';
import { huddleGroupTestObject1, huddleGroupTestObject2, huddleTestObject } from '../../../../../test_props';
import HuddleFilterSelector from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterSelector';

describe('HuddleFilterSelector' , () => {
  let component;
  let selectedHuddleGroup;

  beforeEach(() => {
    selectedHuddleGroup = huddleGroupTestObject1;

    let props = {
      huddles: [ huddleGroupTestObject1, huddleGroupTestObject2 ],
      selectedHuddleGroup,
      selectedHuddle: huddleTestObject,
      selectHuddleGroup(huddleGroup) { selectedHuddleGroup = huddleGroup; },
      selectHuddle: () => null
    };

    component = renderComponent(HuddleFilterSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-selector');
  });

  it('displays the correct huddle group name', () => {
    expect(component.find(".huddleGroup-name").first()).to.have.text('Sample Huddle Group 1');
  });

  it('can select a huddle group', () => {
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(selectedHuddleGroup).to.eq(huddleGroupTestObject2);
  });
});
