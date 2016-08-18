import { renderComponent , expect } from '../../test_helper';
import Nav from '../../../src/components/Header/Nav';

describe('Nav' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Nav);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('nav');
  });

  it('shows a logo', () => {
    expect(component.find('.logo')).to.exist;
  });
});
