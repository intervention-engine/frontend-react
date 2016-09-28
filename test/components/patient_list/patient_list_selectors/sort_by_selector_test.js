import { expect, renderComponent } from '../../../test_helper';
import { sortOptionTestObject1, sortOptionTestObject2 } from '../../../test_props';
import SortBySelector from '../../../../src/components/PatientList/PatientListSelectors/SortBySelector';

describe('SortBySelector' , () => {
  let component;
  let sortOption;
  let sortAscending;

  beforeEach(() => {
    sortOption = sortOptionTestObject1;
    sortAscending = true;

    let props = {
      sortOptions: [ sortOptionTestObject1, sortOptionTestObject2 ],
      sortOption,
      sortAscending,
      selectSortOption(option) { sortOption = option; },
      setSortAscending(ascendingBool) { sortAscending = ascendingBool; }
    }

    component = renderComponent(SortBySelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('sort-by-selector');
  });

  it('displays the correct sort name', () => {
    expect(component.find(".sort-option-name").first()).to.have.text('Sort Name 1');
  });

  it('can select a sort option', () => {
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(sortOption).to.eq(sortOptionTestObject2);
  });

  it('can select a sort direction', () => {
    component.find('button:eq(1)').simulate('click');
    expect(sortAscending).to.be.false;
  });
});
