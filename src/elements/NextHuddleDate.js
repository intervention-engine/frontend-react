import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

export default class NextHuddleDate extends Component {
  render() {
    return (
      <div>
        <div>
          <FontAwesome name={this.props.huddleIconName}
                       fixedWidth={true}
                       data-tip={this.props.huddleReason}/>
          <span data-tip={this.props.huddleGroupName}>
            {' '}{moment(this.props.huddleDate).format('MMM D, YYYY')}
          </span>
        </div>

        <ReactTooltip />
      </div>
    );
  }
}

NextHuddleDate.displayName = 'NextHuddleDate';

NextHuddleDate.propTypes = {
  huddleIconName: PropTypes.string.isRequired,
  huddleGroupName: PropTypes.string.isRequired,
  huddleReason: PropTypes.string.isRequired,
  huddleDate: PropTypes.string.isRequired
};
