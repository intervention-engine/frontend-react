import React, { Component, PropTypes } from 'react';

export default class PageHeader extends Component {
  render() {
    return (
      <div className="page-header">
        <div className="page-header-text">{this.props.title}</div>
      </div>
    );
  }
}

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};
