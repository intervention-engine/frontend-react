import { renderComponent , expect } from '../../test_helper';
import Header from '../../../src/components/Header/Header';

describe('Header' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Header);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('header');
  });

  it('shows a nav', () => {
    expect(component.find('.nav')).to.exist;
  });
});
