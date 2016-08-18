import React, { PropTypes } from 'react';

const PageHeader = ({title}) => {
  return (
    <div className="page-header">
      <div className="page-header-text">{title}</div>
    </div>
  );
};

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeader;
