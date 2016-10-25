import axios from 'axios';
import { param } from 'jquery';

import {
  FETCH_RISK_ASSESSMENTS,
  SELECT_RISK_ASSESSMENT
} from './types';

export function fetchRiskAssessments(riskAssessment, patientIds) {
  let riskAssessmentString = typeof riskAssessment === 'string' ? riskAssessment : riskAssessment.method;

  let riskParams = {
    method: `http://interventionengine.org/risk-assessments|${riskAssessmentString}`,
    _tag: 'http://interventionengine.org/tags/|MOST_RECENT',
    'subject:Patient': patientIds.join(','),
    _count: patientIds.length
  };

  let riskAssessmentURL = `${FHIR_SERVER}/RiskAssessment?${param(riskParams, true)}` || [];

  return {
    type: FETCH_RISK_ASSESSMENTS,
    payload: axios.get(riskAssessmentURL)
  };
}

export function selectRiskAssessment(riskAssessment) {
  return {
    type: SELECT_RISK_ASSESSMENT,
    payload: riskAssessment
  };
}
