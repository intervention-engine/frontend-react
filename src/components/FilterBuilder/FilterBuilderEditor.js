import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import {set} from 'lodash';

import FilterBuilderEditorItem from './FilterBuilderEditorItem';
import { filterTypes } from '../../utils/FilterTypes';

class FilterBuilderEditor extends Component {
    constructor(...args) {
      super(...args);
      this.state = this.setStateForEditOrCreate();
    }

    setStateForEditOrCreate(props) {
      let newState = Object.assign({},this.props);
      newState.filters = newState.filters.map((f) => this.addFilterMetadata(f));
      return newState;
    }

    addFilterMetadata(filter) {
      let filterTemplate = filterTypes.find((f) => f.filter_type === filter.filter_type);
      let newFilter = Object.assign({displayName: filterTemplate.displayName, icon:filterTemplate.icon, displayType:filterTemplate.displayType, filter_type: filterTemplate.filter_type, unique: filterTemplate.unique, ...filterTemplate.defaultValues}, filter);
      return newFilter;
    }

    updateFilter = (filterIndex) => {
      return (key, value) => {
        let filters = this.state.filters;
        set(filters[filterIndex], key, value);
        let {name, id} = this.state;
        this.props.onFilterChange({name, id, filters});
        this.setState({filters});
      }
    }

    updateFilterName = (e) => {
      let name = e.target.value;
      // Instacount shouldn't fire here
      this.setState({name});
    }

    saveFilter = () => {
      // Because there's a bunch of dnd stuff in state let's just toss that out
      let {name, id, filters} = this.state;
      this.props.saveFilter({name, id, filters});
    }

    render() {
      const { canDrop, isOver, connectDropTarget } = this.props;
      let validDrop = isOver && canDrop;

      return (
        connectDropTarget(
          <div className={`filter-editor-drop ${validDrop ? 'valid-drop-target' : ''}`}>
            <div className='title'>Filter Details for <input className='input-control' type='text' defaultValue={this.state.name} onChange={this.updateFilterName} /> <button className='btn btn-primary pull-right' onClick={this.saveFilter}>Save</button></div>
            {this.state.filters.map((f,i) => {
              return <FilterBuilderEditorItem filter={f} key={f.key} removeFilter={this.removeFilter(i)} updateFilter={this.updateFilter(i)}/>
            })}
          </div>
        )
      );
    }

    removeFilter(index) {
      return () => {
        let filters = this.state.filters;
        // You should check that the index isn't < 0 normally
        // since this function is only called from generated indices
        filters.splice(index, 1);
        let {name, id} = this.state;
        this.props.onFilterChange({name, id, filters});
        this.setState({filters});
      }
    }
    addFilter(filter) {
      if(filter.unique && this.state.filters.map((f) => f.filter_type).includes(filter.filter_type)){
        return;
      }
      let filters = this.state.filters;
      filters.push(filter);
      let {name, id} = this.state;
      this.props.onFilterChange({name, id, filters});
      this.setState({filters});
    }
}

function collect(connect,monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const dropTarget = {
  drop(_, monitor, component) {
    let itemTemplate = monitor.getItem();
    // Build the filter data from the template
    let item = {displayName: itemTemplate.displayName, icon:itemTemplate.icon, displayType:itemTemplate.displayType, filter_type: itemTemplate.filter_type, unique: itemTemplate.unique, ...itemTemplate.defaultValues};
    component.addFilter(item)
  }
};

export default DropTarget('GutterItem', dropTarget, collect)(FilterBuilderEditor);
