import React from 'react';

import PopulationFilterSelector from './PopulationFilterSelector';
import HuddleFilterSelector from './HuddleFilterSelector/HuddleFilterSelector';
import CollapsiblePanel from '../../../../elements/CollapsiblePanel';

const FilterSelector = () => {
  return (
    <div className="filter-selector">
      <CollapsiblePanel panelTitle="Populations" isNested={true}>
        <PopulationFilterSelector />
      </CollapsiblePanel>

      <CollapsiblePanel panelTitle="Huddles" isNested={true}>
        <HuddleFilterSelector />
      </CollapsiblePanel>
    </div>
  );
};

FilterSelector.displayName = 'FilterSelector';

export default FilterSelector;
