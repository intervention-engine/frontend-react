import { renderComponent , expect } from '../test_helper';
import Footer from '../../src/components/Footer';

describe('Footer' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Footer);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('footer');
  });

  it('shows a logo', () => {
    expect(component.find('.logo')).to.exist;
  });

  it('shows the version number', () => {
    expect(component.find('.version').text()).to.eq(`v${global.VERSION}`);
  })
});
