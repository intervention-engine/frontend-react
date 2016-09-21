import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import { sortOptions } from '../../../reducers/sort';
import { selectSortOption, setSortAscending } from '../../../actions/sort';

export class SortBySelector extends Component {
  isSelected(sortOption) {
    return this.props.sortOption.id === sortOption.id;
  }

  renderedSortKeys(sortOption) {
    let ascButtonClassNames = classNames('btn', 'btn-default',
      { 'btn-active': this.props.sortAscending === true });
    let descButtonClassNames = classNames('btn', 'btn-default',
      { 'btn-active': this.props.sortAscending === false });

    if (this.isSelected(sortOption)) {
      return (
        <div className="btn-group pull-right">
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
      this.props.selectSortOption(null);
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
          {sortOptions.map((sortOption) => {
            return this.renderedSortOption(sortOption);
          })}
        </form>

        {/*<div className="debug">{this.debugSelected()}</div>*/}
      </div>
    );
  }
};

export function mapStateToProps(state) {
  return {
    sortOption: state.sort.sortOption,
    sortAscending: state.sort.sortAscending
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectSortOption,
    setSortAscending
  }, dispatch);
}

SortBySelector.displayName = 'SortBySelector';

SortBySelector.propTypes = {
  sortOption: PropTypes.object.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  selectSortOption: PropTypes.func.isRequired,
  setSortAscending: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBySelector);
