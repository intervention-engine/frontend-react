import { COMPARE, SELECT, CODE } from './FilterDisplayTypes';

export const filterTypes = [
  {filter_type:'age', displayType: COMPARE, icon: 'birthday-cake', displayName: 'Patient Age', defaultValues: {comparator:'between', time_unit: 'years', range: {low:0, high:65}}},
  {filter_type:'gender', displayType: SELECT, icon: 'user', displayName: 'Patient Gender', defaultValues: {value: 'male', options: ['male', 'female', 'other', 'unknown', 'apache helicopter']}},
  {filter_type:'condition', displayType: CODE, icon: 'icon-med-clipboard', displayName: 'Conditions', defaultValues: {codes: [{code: '', system: ''}], systemOptions: ['ICD-9', 'ICD-10']}},
  {filter_type:'encounter', displayType: CODE, icon: 'hospital-o', displayName: 'Encounters', defaultValues: {codes: [{code: '', system: ''}], systemOptions: ['LOINC', 'SNOMED']}}
];
