import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class CodeItem extends Component {
  constructor(...args) {
      super(...args);
      this.state = {active: true, codes: this.props.filter.codes};
  }

  toggleActive = () => {
    this.setState({active: !this.state.active});
  }

  addCode = () => {
    let codes = this.state.codes;
    codes.push({code: '', system: ''})
    this.setState({codes});
  }

  removeCode = (index) => {
    let codes = this.state.codes;
    // You should check that the index isn't < 0 normally
    // since this function is only called from generated indices
    codes.splice(index, 1);
    this.props.updateFilter('codes', codes);
  }

  renderContents(filter) {
    if(this.state.active) {
      return (
        <div className='selected-filter-details'>
          <span className="pane-inner-label">coded</span>
          <button type="button" className="close" onClick={this.addCode} aria-label="Add Code">
            <span aria-hidden="true"><i className="fa fa-plus"></i></span>
          </button>
          {this.state.codes.map((c,i) => {
            return this.renderCodeInput(c,i,filter.systemOptions, this.removeCode);
          })}
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderCodeInput(c, index, systems, removeFilter) {
    return (
        <div key={index}>
          <select className="cs-select cs-skin-border" value={c.system} onChange={(e) => this.props.updateFilter(`codes[${index}].system`, e.target.value)}>
            {systems.map((opt) => <option value={opt}>{opt}</option>)}
          </select>
          <span className='pane-input'><input className='input-control' value={c.code} onChange={(e) => this.props.updateFilter(`codes[${index}].code`, e.target.value)} /></span>
          <button type="button" className="close" onClick={() => this.removeCode(index)} aria-label="Close">
            <span aria-hidden="true"><i className="fa fa-times"></i></span>
          </button>
        </div>
    )

  }

  renderNonActive(filter) {
    if(this.state.active) {
      return filter.displayName;
    }
    return (
      `${filter.displayName} is coded ${filter.codes.map((c) => c.code).join(' or ')}`
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

export default CodeItem;
