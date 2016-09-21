import { expect, renderComponent } from '../../../test_helper';
import SortBySelectorRedux, { SortBySelector, mapStateToProps } from '../../../../src/components/PatientList/PatientListSelectors/SortBySelector';

describe('SortBySelector' , () => {
  let component;
  let sortOptions;
  let state;

  beforeEach(() => {
    sortOptions = [
      { id: 1, name: 'Name', sortKey: 'name,birthdate', sortIcon: 'alpha', invert: false, defaultSortAscending: true },
      { id: 2, name: 'Age', sortKey: 'birthdate,name', sortIcon: 'numeric', invert: true, defaultSortAscending: true },
      { id: 3, name: 'Gender', sortKey: 'gender,name', sortIcon: 'alpha', invert: false, defaultSortAscending: true }
    ];

    state = {
      sort: {
        sortOption: sortOptions[0],
        sortAscending: true
      }
    };

    component = renderComponent(SortBySelectorRedux, {}, state);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('sort-by-selector');
  });

  it('maps state to props', () => {
    let stateProps = mapStateToProps(state);
    expect(stateProps.sortOption.name).to.equal('Name');
    expect(stateProps.sortAscending).to.equal(true);
  });

  it('displays the sort name', () => {
    expect(component.find(".sort-option-name").first()).to.have.text('Name');
  });

  it('can select a sort option', () => {
    let executed = false;
    let props = {
      sortOption: sortOptions[1],
      selectSortOption(sortOption) { executed = (sortOption.id === sortOptions[1].id); }
    };

    let component = renderComponent(SortBySelector, props);
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(executed).to.be.true;
  });

  it('can select a sort direction', () => {
    let executed = false;
    let props = {
      sortOption: sortOptions[0],
      sortAscending: false,
      setSortAscending(sortAscending) { executed = (sortAscending === false); }
    };

    let component = renderComponent(SortBySelector, props);
    component.find('button:eq(1)').simulate('click');
    expect(executed).to.be.true;
  });
});
