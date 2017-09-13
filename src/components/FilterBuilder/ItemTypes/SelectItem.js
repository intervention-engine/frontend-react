import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class SelectItem extends Component {
  constructor(...args) {
      super(...args);
      this.state = {active: true};
  }

  toggleActive = () => {
    this.setState({active: !this.state.active});
  }

  renderContents(filter) {
    if(this.state.active) {
      return (
        <div className='selected-filter-details'>
          <span className="pane-inner-label">is</span>
          <select className="cs-select cs-skin-border" value={filter.value} onChange={(e) => this.props.updateFilter('value', e.target.value)}>
            {filter.options.map((opt) => <option value={opt}>{opt}</option>)}
          </select>
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderNonActive(filter) {
    if(this.state.active) {
      return filter.displayName;
    }
    return (
      `${filter.displayName} is ${filter.value}`
    );
  }

  render() {
    let {filter} = this.props;

    return (
      <form className='form-horizontal filter-item'>
        <input type="checkbox" id={`${filter.filter_type}_enable`} name={`checkbox-${filter.filter_type}`} className="css-checkbox" checked={this.state.active} onChange={this.toggleActive} />
        <label htmlFor={`checkbox-${filter.filter_type}`} className="css-label css-label-box checkbox-label">
          {this.renderNonActive(filter)}
        </label>
        <div className='form-group'>
          {this.renderContents(filter)}
        </div>
      </form>
    );
  }
}

export default SelectItem;
