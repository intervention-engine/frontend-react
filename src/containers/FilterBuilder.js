import React, {Component} from 'react';

import PageHeader from '../components/Header/PageHeader';
import Dragula from 'react-dragula';

class FilterBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: []};
  }

  dragController = null;

  render() {
    return (
      <div className="filter-builder container">
        <PageHeader title="Filter Builder" />
        <div>Filter Builder</div>
        <div className='container' ref={this.dragulaDecorator.bind(this)}>
          <div className='source'>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap me around</div>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap her around</div>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap him around</div>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap them around</div>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap us around</div>
            <div style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap things around</div>
            <div data-filter-type='test' style={{margin: '5px', padding:'5px', border: '1px solid black'}}>Swap everything around</div>
          </div>
          <div className='target'>Test
          </div>
        </div>

      </div>
    );
  }

  onFilterDrop(el) {
    // debugger
    this.setState({selected: [].concat(this.state.selected, el)})
    console.log(this.state);
    return true;
  }

  dragulaDecorator(component) {
    if(component) {
      let options = {

      };
      let dragController = Dragula([component.querySelector('.source'), component.querySelector('.target')], options);
      dragController.on('drop', this.onFilterDrop.bind(this));
    }
  }
};

FilterBuilder.displayName = 'FilterBuilder';

export default FilterBuilder;
