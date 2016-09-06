import { renderComponent , expect } from '../test_helper';
import FilterBuilder from '../../src/components/FilterBuilder';

describe('FilterBuilder' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(FilterBuilder);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('filter-builder');
  });

  it('shows a page header', () => {
    expect(component.find('.page-header')).to.exist;
  });
});
