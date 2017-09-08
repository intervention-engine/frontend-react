import React, { Component }from 'react';
import FontAwesome from 'react-fontawesome';
import { DragSource } from 'react-dnd';


class FilterGutterItem extends Component {
  render() {
    const { isDragging, connectDragSource} = this.props;
    return (
      connectDragSource(
        <div key={this.props.key} className='filter-type'>
          <div className="filter-type-icon">
            <FontAwesome name={this.props.icon} />
          </div>
          <div className='filter-type-name'> {this.props.displayName} </div>
          <FontAwesome name='chevron-right' className='filter-type-chevron'/>
        </div>
      )
    );
  }
}

const gutterItemSource = {
  beginDrag(props) {
    return props;
  },
  endDrag(_, monitor, component) {
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


export default DragSource('GutterItem', gutterItemSource, collect)(FilterGutterItem);
