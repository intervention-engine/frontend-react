import { expect, renderComponent } from '../../../../../test_helper';
import { huddleTestObject } from '../../../../../test_props';
import HuddleFilterDateSelector from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterDateSelector';

describe('HuddleFilterDateSelector' , () => {
  let component;

  beforeEach(() => {
    let props = {
      huddles: [ huddleTestObject ],
      selectedHuddle: huddleTestObject,
      filterPatientsByHuddle: () => null
    };

    component = renderComponent(HuddleFilterDateSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-date-selector');
  });

  it('displays the selected huddle date', () => {
    expect(component.find(".huddle-date").first()).to.have.text('Thu, Jan 1st 2099');
  });
});
