// ------------------------- PATIENTS -------------------------------------- //

export const patientTestObject1 = {
  'id': '1', 'gender': 'female', 'birth_date': '1980-01-01', 'age': 36,
  'name': { 'family': 'Doe', 'given': 'Jane', 'full': 'Doe, Jane' },
  'address': { 'street': ['123 Any Street'], 'city': 'Metropolis',
               'state': 'MA', 'postalCode': '00000' },
  'next_huddle': { 'care_team_name': 'Care Team A',
                   'huddle_date': '2099-01-01',
                   'huddle_id': '5',
                   'reason': 'Risk Score Warrants Discussion',
                   'reason_type': 'RISK_SCORE',
                   'reviewed': false,
                   'reviewed_at': null },
  'recent_risk_assessment': { date: '2000-01-01', id: 'pr1', risk_service_id: 'rs1', value: 3 }
};

export const patientTestObject2 = {
  'id': '2', 'gender': 'male', 'birth_date': '1970-01-01', 'age': 46,
  'name': { 'family': 'Smith', 'given': 'John', 'full': 'Smith, John' },
  'address': { 'street': ['456 Any Street'], 'city': 'Cityland',
               'state': 'MA', 'postalCode': '00001' },
  'next_huddle': { 'care_team_name': 'Care Team A',
                   'huddle_date': '2099-01-01',
                   'huddle_id': '5',
                   'reason': 'Manually Added',
                   'reason_type': 'MANUAL_ADDITION',
                   'reviewed': false,
                   'reviewed_at': null },
  'recent_risk_assessment': { date: '2001-01-01', id: 'pr2', risk_service_id: 'rs1', value: 2 }
};

export const patientMetaTestObject = {
  'total': 2,
  'pageNum': 1
}

export const selectedPageTestObject = {
  'pageNum': 1,
  'currentPage': 1
};

// ------------------------- POPULATIONS ----------------------------------- //

export const populationsTestObject1 = {
  'id': '3',
  'meta': { 'lastUpdated': '2000-01-01' },
  'name': 'Sample Population Name 1',
  'characteristic': [ { 'code': { 'coding': [ { 'system': 'Sample System 1',
                                                'code': '00000-1',
                                                'userSelected': false } ] },
                        'exclude': false,
                        'valueBoolean': false,
                        'valueRange': { 'high': { 'value': 65 },
                                        'low': { 'value': 0 } } } ]
};

export const populationsTestObject2 = {
  'id': '4',
  'meta': { 'lastUpdated': '2001-01-01' },
  'name': 'Sample Population Name 2',
  'characteristic': [ { 'code': { 'coding': [ { 'system': 'Sample System 1',
                                                'code': '00000-2',
                                                'userSelected': false } ] },
                        'exclude': false,
                        'valueBoolean': false,
                        'valueRange': { 'high': { 'value': 70 },
                                        'low': { 'value': 18 } } } ]
};

// ------------------------- HUDDLES --------------------------------------- //

export const huddleTestObject = {
  'id': '5',
  'date': '2099-01-01',
  'care_team_id': 'cta',
  'patients': [
    { 'id': '1',
      'reason': 'Risk Score Warrants Discussion',
      'reason_type': 'RISK_SCORE',
      'reviewed': false,
      'reviewed_at': null
    },
    { 'id': '2',
      'reason': 'Recent Encounter Warrants Discussion',
      'reason_type': 'RECENT_ENCOUNTER',
      'reviewed': false,
      'reviewed_at': null
    }
  ]
};

export const careTeamTestObject1 = {
  'id': '6',
  'name': 'Care Team A',
  'leader': 'Leader A'
};

export const careTeamTestObject2 = {
  'id': '7',
  'name': 'Care Team B',
  'leader': 'Leader B'
};

// ------------------------- RISK SERVICES/ASSESSMENTS --------------------- //

export const riskServiceTestObject1 = {
  'id': 'rs1',
  'name': 'Sample Risk Service 1',
};

export const riskServiceTestObject2 = {
  'id': 'rs2',
  'name': 'Sample Risk Service 2',
};

export const riskAssessmentTestObject1 = {
  'id': 'ra1',
  'risk_service_id': 'rs1',
  'date': '2000-06-01',
  'value': 3
};

export const riskAssessmentTestObject2 = {
  'id': 'ra2',
  'risk_service_id': 'rs1',
  'date': '2000-05-01',
  'value': 2
};

export const riskAssessmentBreakdownObject = [
  {
    "name": "Clinical Risk",
    "weight": 25,
    "value": 1,
    "max_value": 4
  },
  {
    "name": "Functional and Environmental Risk",
    "weight": 25,
    "value": 1,
    "max_value": 4
  },
  {
    "name": "Psychosocial and Mental Health Risk",
    "weight": 25,
    "value": 2,
    "max_value": 4
  },
  {
    "name": "Utilization Risk",
    "weight": 25,
    "value": 1,
    "max_value": 4
  }
]

// ------------------------- SORT ------------------------------------------ //

export const sortOptionTestObject1 = {
  'id': '11',
  'name': 'Sort Name 1',
  'sortKey': 'sortKey1,sortKey2',
  'sortIcon': 'alpha1',
  'invert': false,
  'defaultSortAscending': true
}

export const sortOptionTestObject2 = {
  'id': '12',
  'name': 'Sort Name 2',
  'sortKey': 'sortKey3,sortKey4',
  'sortIcon': 'alpha2',
  'invert': true,
  'defaultSortAscending': false
}
