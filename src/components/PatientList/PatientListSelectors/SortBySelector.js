import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectSortOption
} from '../../../actions/sort';

export class SortBySelector extends Component {

  isSelected(sortOption) {
    return this.props.sortOption.id === sortOption.id;
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
          </label>
        </div>
      </div>
    );
  }

  debugSelected() {
    if (this.props.sortOption) {
      return this.props.sortOption.name;
    }
  }

  render() {
    const sortOptions = [
      { id: 1, name: 'Name', sortKey: 'name,birthdate', sortIcon: 'alpha', invert: false, defaultSortDescending: false },
      { id: 2, name: 'Age', sortKey: 'birthdate,name', sortIcon: 'numeric', invert: true, defaultSortDescending: false },
      { id: 3, name: 'Gender', sortKey: 'gender,name', sortIcon: 'alpha', invert: false, defaultSortDescending: false },
      { id: 4, name: 'Location', sortKey: 'address,name', sortIcon: 'alpha', invert: false, defaultSortDescending: false },
      { id: 5, name: 'Risk Score', sortKey: 'riskScore,name', sortIcon: 'numeric', invert: false, defaultSortDescending: true },
      { id: 6, name: 'Notifications', sortKey: 'notifications,name', sortIcon: 'numeric', invert: false, defaultSortDescending: true }
    ];

    return (
      <div className="sort-by-selector">
        <form className="form-horizontal form-group-striped">
          {sortOptions.map((sortOption) => {
            return this.renderedSortOption(sortOption);
          })}
        </form>

        <div className="debug">SELECTED: {this.debugSelected()}</div>
      </div>
    );
  }
};

export function mapStateToProps(state) {
  return {
    sortOption: state.sort.sortOption
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectSortOption
  }, dispatch);
}

SortBySelector.displayName = 'SortBySelector';

SortBySelector.propTypes = {
  sortOption: PropTypes.object.isRequired,
  selectSortOption: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBySelector);
