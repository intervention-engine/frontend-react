import { renderComponent , expect } from '../../test_helper';
import Logo from '../../../src/components/Header/Logo';

describe('Logo' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Logo);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('logo');
  });

  it('has an image', () => {
    expect(component.find('img')).to.exist;
  })
});
