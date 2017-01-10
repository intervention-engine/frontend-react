import React, { Component } from 'react';
import _ from 'lodash';

import CollapsiblePanel from '../../../elements/CollapsiblePanel';

import patientProps from '../../../prop-types/patient';

export default class PatientViewStatsConditions extends Component {
  constructor(...args) {
    super(...args);

    let conditions = this.getActiveConditions(this.props.patient);
    let uniqueConditionsText = _.uniq(conditions.map((condition) => condition.code.text));

    this.state = {
      conditions,
      uniqueConditionsText,
      uniqueConditionsTextCount: uniqueConditionsText.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patient != this.props.patient) {
      let conditions = this.getActiveConditions(nextProps.patient);
      let uniqueConditionsText = _.uniq(conditions.map((condition) => condition.code.text));
      this.setState({ conditions, uniqueConditionsText, uniqueConditionsTextCount: uniqueConditionsText.length });
    }
  }

  getActiveConditions(patient){
    if (patient != null && patient.Condition != null) {
      let conditions = patient.Condition;
      return conditions.filter(this.isActiveCondition);
    } else {
      return [];
    }
  }

  isActiveCondition(condition) {
    let onsetDateTime;
    if (condition.onsetDateTime != null) {
       onsetDateTime = new Date(condition.onsetDateTime);
    }

    let abatementDateTime;
    if (condition.abatementDateTime != null) {
      abatementDateTime = new Date(condition.abatementDateTime);
    }

    let today = new Date();

    return (onsetDateTime <= today
            && (abatementDateTime == null || abatementDateTime >= today)
            && condition.verificationStatus === "confirmed");
  }

  renderedConditions() {
    return this.state.uniqueConditionsText.map((conditionText, index) => {
      return <li key={index}>{conditionText}</li>;
    });
  }

  render() {
    return (
      <div className="patient-view-stats-conditions">
        <CollapsiblePanel panelTitle="Conditions"
                          panelIcon="fc-med-clipboard"
                          panelCount={this.state.uniqueConditionsTextCount}>
          <div className="patient-view-stats-conditions-list">
            <ul>{this.renderedConditions()}</ul>
          </div>
        </CollapsiblePanel>
      </div>
    );
  }
}

PatientViewStatsConditions.displayName = 'PatientViewStatsConditions';

PatientViewStatsConditions.propTypes = {
  patient: patientProps
};
