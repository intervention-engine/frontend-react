import React from 'react';

import PopulationFilterSelector from './PopulationFilterSelector';
import HuddleFilterSelector from './HuddleFilterSelector';

const FilterSelector = () => {
  return (
    <div className="filter-selector">
      <PopulationFilterSelector />
      <HuddleFilterSelector />
    </div>
  );
};

FilterSelector.displayName = 'FilterSelector';

export default FilterSelector;
