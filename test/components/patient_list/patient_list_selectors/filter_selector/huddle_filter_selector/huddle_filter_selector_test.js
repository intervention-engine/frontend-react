import { expect, renderComponent } from '../../../../../test_helper';
import { careTeamTestObject1, careTeamTestObject2, huddleTestObject } from '../../../../../test_props';
import HuddleFilterSelector from '../../../../../../src/components/PatientList/PatientListSelectors/FilterSelector/HuddleFilterSelector/HuddleFilterSelector';

describe('HuddleFilterSelector' , () => {
  let component;
  let selectedCareTeam;

  beforeEach(() => {
    selectedCareTeam = careTeamTestObject1;

    let props = {
      careTeams: [ careTeamTestObject1, careTeamTestObject2 ],
      selectedCareTeam,
      huddles: [ huddleTestObject ],
      selectedHuddle: huddleTestObject,
      selectCareTeam(careTeam) { selectedCareTeam = careTeam; },
      filterPatientsByHuddle: () => null,
      filterPatientsByFirstHuddle: (careTeam) => { selectedCareTeam = careTeam; }
    };

    component = renderComponent(HuddleFilterSelector, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('huddle-filter-selector');
  });

  it('displays the correct care team name', () => {
    expect(component.find(".careTeam-name").first()).to.have.text('Care Team A');
  });

  it('can select a care team', () => {
    component.find('input[type=radio]:eq(1)').simulate('change');
    expect(selectedCareTeam).to.eq(careTeamTestObject2);
  });
});
