export const patientTestObject1 = {
  'id': '1', 'gender': 'female', 'birthDate': '1980-01-01', 'age': 36,
  'name': { 'family': 'Doe', 'given': 'Jane', 'full': 'Doe, Jane' },
  'address': { 'street': '123 Any Street', 'city': 'Metropolis',
               'state': 'MA', 'postalCode': '00000' }
};

export const patientTestObject2 = {
  'id': '2', 'gender': 'male', 'birthDate': '1970-01-01', 'age': 46,
  'name': { 'family': 'Smith', 'given': 'John', 'full': 'Smith, John' },
  'address': { 'street': '456 Any Street', 'city': 'Cityland',
               'state': 'MA', 'postalCode': '00001' }
};

export const patientsMetaTestObject = {
  'total': 2,
  'link': [ { 'relation': 'Sample relation',
              'url': 'Sample URL' } ]
};

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

export const huddleTestObject = {
  'id': '5',
  'datetime': '2099-01-01',
  'practioner': 'SamplePractioner',
  'patients': [ { 'id': '1',
                  'reason': { 'code': 'RISK_SCORE',
                              'text': 'Risk Score Warrants Discussion' } },
                { 'id': '2',
                  'reason': { 'code': 'RECENT_ENCOUNTER',
                              'text': 'Recent Encounter Warrants Discussion' } } ]
};

export const huddleGroupTestObject1 = {
  'id': '6',
  'name': 'Sample Huddle Group 1',
  'dates': [ huddleTestObject ]
};

export const huddleGroupTestObject2 = {
  'id': '7',
  'name': 'Sample Huddle Group 2',
  'dates': [ huddleTestObject ]
};

export const riskAssessmentTypeTestObject1 = {
  'id': '8',
  'name': 'Sample Risk Assessment 1',
  'method': 'SampleMethod1'
};

export const riskAssessmentTypeTestObject2 = {
  'id': '9',
  'name': 'Sample Risk Assessment 2',
  'method': 'SampleMethod2'
};

export const riskAssessmentTestObject = {
  'id': '10',
  'name': 'Sample Risk Name',
  'patients': [ { 'id': '1',
                  'risks': [ { 'date': '2000-01-01',
                               'value': 3,
                               'pie': 'pieReference1' } ] },
                { 'id': '2',
                  'risks': [ { 'date': '2000-02-01',
                               'value': 2,
                               'pie': 'pieReference2' } ] } ]
};

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
