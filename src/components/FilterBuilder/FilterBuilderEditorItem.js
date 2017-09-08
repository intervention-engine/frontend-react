import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import CompareItem from './ItemTypes/CompareItem';
import SelectItem from './ItemTypes/SelectItem';
import CodeItem from './ItemTypes/CodeItem';
import { COMPARE, SELECT, CODE } from '../../utils/FilterDisplayTypes';

class FilterBuilderEditorItem extends Component {
  render() {
    return (
      <div className='pane row'>
        <div className="col-sm-2 pane-icon">
          <FontAwesome name={this.props.filter.icon} />
        </div>

        <div className="col-xs-10 pane-content">
          <div className="row pane-outline">
            <div className="col-xs-11">
              <div className="row">
                {this.renderItem(this.props.filter, this.props.updateFilter)}
              </div>
            </div>

            <div className="col-xs-1 pane-close">
              <button type="button" className="close" onClick={this.props.removeFilter} aria-label="Close">
                <span aria-hidden="true"><i className="fa fa-times"></i></span>
              </button>
            </div>
            <span className="pointer-bottom"></span>
            <span className="pointer-top"></span>
          </div>
        </div>
      </div>
    )
  }

  renderItem(filter, updateFilter) {
    switch (filter.displayType) {
      case COMPARE:
        return <CompareItem filter={filter} updateFilter={updateFilter} />
        break;
      case SELECT:
        return <SelectItem filter={filter} updateFilter={updateFilter} />
        break;
      case CODE:
        return <CodeItem filter={filter} updateFilter={updateFilter} />
        break;
      default:
        return null;
    }
  }
}

export default FilterBuilderEditorItem;
