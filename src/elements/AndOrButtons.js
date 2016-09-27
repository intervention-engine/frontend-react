import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class AndOrButtons extends Component {
  render() {
    let unionButtonClassNames = classNames('selector-type', 'selector-type-union', 'btn',
      { active: this.props.selectorType === "union" });
    let intersectionButtonClassNames = classNames('selector-type', 'selector-type-intersection', 'btn',
      { active: this.props.selectorType === "intersection" });

    return (
      <div>
        <button type="button" className={unionButtonClassNames}
          onClick={() => this.props.unionFunction("union")}>
          <i className="fc-union"></i> OR
        </button>

        <button type="button" className={intersectionButtonClassNames}
          onClick={() => this.props.intersectionFunction("intersection")}>
          <i className="fc-intersection"></i> AND
        </button>
      </div>
    );
  }
}

AndOrButtons.displayName = 'AndOrButtons';

AndOrButtons.propTypes = {
  selectorType: PropTypes.string.isRequired,
  unionFunction: PropTypes.func.isRequired,
  intersectionFunction: PropTypes.func.isRequired
};
