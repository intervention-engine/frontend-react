// ------------------------- PATIENTS -------------------------------------- //

export const patientTestObject1 = {
  'id': '1', 'gender': 'female', 'birthDate': '1980-01-01', 'age': 36,
  'name': { 'family': 'Doe', 'given': 'Jane', 'full': 'Doe, Jane' },
  'address': { 'street': ['123 Any Street'], 'city': 'Metropolis',
               'state': 'MA', 'postalCode': '00000' },
  'Condition': [ { 'onsetDateTime': '2000-01-01',
                   'abatementDateTime': '2001-01-01',
                   'code': { 'text': 'Urinary Tract Infection' },
                   'verificationStatus': 'confirmed' },
                 { 'onsetDateTime': '2000-01-01',
                   'code': { 'text': 'Pulmonary Heart Disease' },
                   'verificationStatus': 'confirmed' },
                 { 'onsetDateTime': '2000-01-01',
                   'code': { 'text': 'Pulmonary Heart Disease' },
                   'verificationStatus': 'confirmed' } ],
  'MedicationStatement': [ { 'effectivePeriod': { 'start': '2000-01-01', 'end': '2001-01-01' },
                             'medicationCodeableConcept': { 'text': 'Lisinopril 10mg Oral Tablet' },
                             'status': 'completed' },
                           { 'effectivePeriod': { 'start': '2000-01-01' },
                             'medicationCodeableConcept': { 'text': 'Sulfamethoxazole/Trimethoprim Oral Tablet' },
                             'status': 'active' },
                           { 'effectivePeriod': { 'start': '2000-01-01' },
                             'medicationCodeableConcept': { 'text': 'Sulfamethoxazole/Trimethoprim Oral Tablet' },
                             'status': 'active' } ]
};

export const patientTestObject2 = {
  'id': '2', 'gender': 'male', 'birthDate': '1970-01-01', 'age': 46,
  'name': { 'family': 'Smith', 'given': 'John', 'full': 'Smith, John' },
  'address': { 'street': ['456 Any Street'], 'city': 'Cityland',
               'state': 'MA', 'postalCode': '00001' }
};

export const patientsMetaTestObject = {
  'total': 2,
  'link': [ { 'relation': 'Sample relation',
              'url': 'Sample URL' } ]
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
  'name': 'Sample Huddle Group 1',
  'datetime': '2099-01-01',
  'practioner': 'SamplePractioner',
  'patients': [ { 'id': '1',
                  'reason': { 'code': 'RISK_SCORE',
                              'text': 'Risk Score Warrants Discussion' },
                  'reviewed': null },
                { 'id': '2',
                  'reason': { 'code': 'RECENT_ENCOUNTER',
                              'text': 'Recent Encounter Warrants Discussion' },
                  'reviewed': null } ]
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

export const nextHuddlesObject = {
  '1': { 'huddle': huddleTestObject,
         'huddleGroup': huddleGroupTestObject1,
         'huddlePatient': { 'id': '1',
                            'reason': { 'code': 'RISK_SCORE',
                                        'text': 'Risk Score Warrants Discussion' },
                            'reviewed': null } }
}

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

export const riskAssessmentBreakdownObject = {
  "risk_assessment_id": "rab1",
  "categories": [
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
}

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
