import { expect, renderComponent } from '../test_helper';
import CollapsiblePanel from '../../src/elements/CollapsiblePanel';

describe('Collapsible Panel', () => {
  let component;

  beforeEach(() => {
    let props = {
      panelTitle: 'My Title',
      panelIcon: 'user',
      panelCount: 100,
      isNested: false,
      hasNested: false
    }

    component = renderComponent(CollapsiblePanel, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('collapsible-panel');
  });

  it('displays the correct title and count', () => {
    expect(component.find('.panel-title')).to.have.text(' My Title (100)');
  });

  it('displays the correct icon', () => {
    expect(component.find('.panel-title span:eq(0)')).to.have.class('fa-user');
  });
});
