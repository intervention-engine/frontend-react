import { expect, renderComponent } from '../../../test_helper';
import { patientTestObject1, patientTestObject2, huddleGroupTestObject1, riskAssessmentTestObject1,
         patientsMetaTestObject, populationsTestObject1, riskServiceTestObject1, sortOptionTestObject1 } from '../../../test_props';
import PatientListResults from '../../../../src/components/PatientList/PatientListResults/PatientListResults';

describe('Patients List Results', () => {
  let component;
  let currentPage;
  let currentPatientSearchValue;

  beforeEach(() => {
    currentPatientSearchValue = '';

    let props = {
      patients: [ patientTestObject1, patientTestObject2 ],
      patientsMeta: patientsMetaTestObject,
      patientSearch: '',
      pageNum: 2,
      selectedPopulations: [ populationsTestObject1 ],
      populationSelectorType: 'union',
      huddles: [ huddleGroupTestObject1 ],
      selectedHuddle: huddleGroupTestObject1,
      selectedRiskService: riskServiceTestObject1,
      sortOption: sortOptionTestObject1,
      sortAscending: true,
      setPatientSearch(value) { currentPatientSearchValue = value; },
      selectPage(page) { currentPage = page; }
    }

    component = renderComponent(PatientListResults, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list-results');
  });

  it('displays the correct patient count', () => {
    expect(component.find('.patient-count')).to.have.text('Patients (2)');
  });

  it('displays the correct number of patientListResultItems', () => {
    expect(component.find('.patient-list-results-item').length).to.equal(2);
  });

  it('can filter the list of patients correctly using search', () => {
    let search = component.find('input[type=search]');

    search.val('abcd').simulate('change');
    expect(currentPatientSearchValue).to.eq('abcd');
    expect(search).to.have.class('expanded');

    search.val('').simulate('change');
    expect(search).to.not.have.class('expanded');
  });

  it('can change pages correctly', () => {
    component.find('.pagination li:eq(2) a').simulate('click');
    expect(currentPage).to.eq(2);
  });
});
