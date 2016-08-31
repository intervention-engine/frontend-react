import { renderComponent , expect } from '../test_helper';
import Patients from '../../src/components/Patients';

describe('Patients' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Patients);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patients');
  });

  it('shows a page header', () => {
    expect(component.find('.page-header')).to.exist;
  });
});
