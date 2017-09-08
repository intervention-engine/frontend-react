import React, {Component} from 'react';
import { DragDropContextProvider } from 'react-dnd';
// import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

import { filterTypes } from '../../utils/FilterTypes';

import FilterGutterItem from './FilterGutterItem';
import FilterBuilderEditor from './FilterBuilderEditor';

export default class FilterBuilderComponent extends Component {

  constructor(...args) {
    super(...args);
  }

  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className='filter-builder-container'>
          <div className='filter-builder-gutter'>
            {filterTypes.map((f) => {
              return <FilterGutterItem {...f} key={f.key}/>
            })}
          </div>
          <div className='filter-builder-editor'>
            <FilterBuilderEditor {...this.props}/>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}
