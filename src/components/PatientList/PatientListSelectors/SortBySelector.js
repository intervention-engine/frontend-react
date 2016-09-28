import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import sortProps from '../../../prop-types/sort';

export default class SortBySelector extends Component {
  isSelected(sortOption) {
    return this.props.sortOption.id === sortOption.id;
  }

  renderedSortKeys(sortOption) {
    let ascButtonClassNames = classNames('btn', 'btn-default', 'sort-asc-button',
      { 'btn-active': this.props.sortAscending === true });
    let descButtonClassNames = classNames('btn', 'btn-default', 'sort-desc-button',
      { 'btn-active': this.props.sortAscending === false });

    if (this.isSelected(sortOption)) {
      return (
        <div className="sort-asc-desc-buttons btn-group pull-right">
          <button
            type="button"
            className={ascButtonClassNames}
            onClick={() => this.props.setSortAscending(true)}>
            <FontAwesome name={`sort-${sortOption.sortIcon}-asc`} />
          </button>

          <button
            type="button"
            className={descButtonClassNames}
            onClick={() => this.props.setSortAscending(false)}>
            <FontAwesome name={`sort-${sortOption.sortIcon}-desc`} />
          </button>
        </div>
      );
    }
  }

  handleInputChange(sortOption) {
    if (this.props.sortOption === sortOption) {
      return;
    }

    this.props.selectSortOption(sortOption);
  }

  renderedSortOption(sortOption) {
    return (
      <div key={sortOption.name} className="sort-option">
        <div className="control-group">
          <label htmlFor={`sort-option-radio-${sortOption.id}`} className={`control control-radio`}>
            <span className="sort-option-name">{sortOption.name}</span>

            <input type="radio"
              name="sortOption"
              id={`sort-option-radio-${sortOption.id}`}
              value={sortOption.id}
              checked={this.isSelected(sortOption)}
              onChange={() => this.handleInputChange(sortOption)} />

            <div className="control-indicator"></div>

            {this.renderedSortKeys(sortOption)}
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.sortOption) {
      return (
        <div>
          <div>SELECTED: {this.props.sortOption.name}</div>
          <div>SORT ASCENDING: {this.props.sortAscending.toString()}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="sort-by-selector">
        <form className="form-horizontal form-group-striped">
          {this.props.sortOptions.map((sortOption) => {
            return this.renderedSortOption(sortOption);
          })}
        </form>

        {/*<div className="debug">{this.debugSelected()}</div>*/}
      </div>
    );
  }
}

SortBySelector.displayName = 'SortBySelector';

SortBySelector.propTypes = {
  sortOptions: PropTypes.arrayOf(sortProps).isRequired,
  sortOption: sortProps.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};
