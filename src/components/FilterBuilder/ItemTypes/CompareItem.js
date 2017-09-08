import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class CompareItem extends Component {
  constructor(...args) {
      super(...args);
      this.state = {active: true};
  }

  toggleActive = () => {
    this.setState({active: !this.state.active});
  }

  renderContents(filter) {
    if(this.state.active) {
      const timePeriods = ['years', 'months'];
      const comparators = ['between', 'over', 'under'];
      const hasHighValue = filter.comparator == 'between' || filter.comparator == 'under';
      const hasLowValue = filter.comparator == 'between' || filter.comparator == 'over';
      const hasTwoValues = hasHighValue && hasLowValue;
      return (
        <div className='selected-filter-details'>
          <span className="pane-inner-label">is</span>
          <select className="cs-select cs-skin-border" value={filter.comparator} onChange={(e) => this.props.updateFilter('comparator', e.target.value)}>
            {comparators.map((period) => <option value={period}>{period}</option>)}
          </select>
          {hasLowValue ? <span className='pane-input'><input type="text" value={filter.range.low} className='input-control' onChange={(e) => this.props.updateFilter('range.low', e.target.value)}/> </span> : null}
          {hasTwoValues ? 'and' : null}
          {hasHighValue ? <span className='pane-input'><input type="text" value={filter.range.high} className='input-control' onChange={(e) => this.props.updateFilter('range.high', e.target.value)}/> </span> : null}
          <span className='pane-select'>
          <select className="cs-select cs-skin-border" value={filter.time_unit} onChange={(e) => this.props.updateFilter('time_unit', e.target.value)}>
            {timePeriods.map((period) => <option value={period}>{period}</option>)}
          </select>
          </span>
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderNonActive(filter) {
    const hasHighValue = filter.comparator == 'between' || filter.comparator == 'under';
    const hasLowValue = filter.comparator == 'between' || filter.comparator == 'over';
    const hasTwoValues = hasHighValue && hasLowValue;
    if(this.state.active) {
      return filter.displayName;
    }
    return (
      `${filter.displayName} is ${filter.comparator} ${hasLowValue ? filter.range.low: ''} ${hasTwoValues ? 'and': ''} ${hasHighValue ? filter.range.high: ''} ${filter.time_unit}`
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

export default CompareItem;
