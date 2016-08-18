import { renderComponent , expect } from '../../test_helper';
import PageHeader from '../../../src/components/Header/PageHeader';

describe('PageHeader' , () => {
  let component;

  beforeEach(() => {
    const props = { title: 'Test Title' };
    component = renderComponent(PageHeader, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('page-header');
  });

  it('shows the correct title', () => {
    expect(component.find('.page-header-text')).to.contain('Test Title');
  });
});
