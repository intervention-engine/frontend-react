import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

export default class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  panelIcon() {
    if (this.props.panelIcon == null || this.props.panelIcon === '') {
      return;
    }

    return <FontAwesome name={this.props.panelIcon} />;
  }

  render() {
    let chevronClassNames = classNames('fa', 'fa-chevron-down', 'rotate', { left: this.state.chevronToggle});

    return (
      <div className="panel panel-collapsible">
        <div className="panel-heading">
          <span className="panel-title">
            {this.panelIcon()}
            {` ${this.props.panelTitle}`}
          </span>

          <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}
             className="pull-right">
            <i className={chevronClassNames}></i>
          </a>
        </div>

        <Collapse className="panel-collapse" in={this.state.open}>
          <div className="panel-body">
            {this.props.children}
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapsiblePanel.displayName = "CollapsiblePanel";

CollapsiblePanel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  panelIcon: PropTypes.string,
  children: PropTypes.element.isRequired
};
