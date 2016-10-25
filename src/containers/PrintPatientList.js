import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import PageHeader from '../components/Header/PageHeader';

import populationProps from '../prop-types/population';
import huddleGroupProps from '../prop-types/huddle_group';
import riskAssessmentProps from '../prop-types/risk_assessment';
import patientProps from '../prop-types/patient';

import { fetchPopulations } from '../actions/population';
import { fetchHuddles } from '../actions/huddle';
import { fetchPatients } from '../actions/patient';

import { sortOptions } from '../reducers/sort';
import { isTodayOrAfter } from '../reducers/huddle';

class PrintPatientList extends Component {
  constructor(...args) {
    super(...args);

    let queryParams = queryParamsHash();

    this.state = {
      queryParams,
      sortOption: sortOptions.find((option) => option.sortKey === queryParams.sortBy),
      selectedRiskAssessment: null,
      selectedHuddleGroup: null,
      selectedPopulations: [],
      nextHuddleForPatients: {},
      patientSearch: queryParams.name,
      loading: true
    };
  }

  componentWillMount() {
    let queryParams = this.state.queryParams;

    let groupIds = [];
    if (queryParams.selectedPopulations) {
      if (queryParams.populationSelectorType === 'union') {
        groupIds.push(queryParams.selectedPopulations.join(','));
      } else {
        groupIds = groupIds.concat(queryParams.selectedPopulations);
      }
    }

    if (queryParams.selectedHuddle) {
      groupIds.push(queryParams.selectedHuddle);
    }

    // group params (population + huddle params)
    let groupIdParams = {};
    if (groupIds.length > 0) {
      groupIdParams = { _query: 'group', groupId: groupIds };
    }

    // sort params
    let sortOption = sortOptions.find((option) => option.sortKey === queryParams.sortBy);
    let sortDir = queryParams.sortAscending === 'true' ? '' : '-';
    if (sortOption.invert) { sortDir = sortDir === '' ? '-' : ''; }
    let sortParams = { _sort: `${sortDir}${sortOption.sortKey}` };

    this.props.fetchPopulations();
    this.props.fetchHuddles();
    this.props.fetchPatients({
      ...groupIdParams,
      ...sortParams,
      name: queryParams.name,
      riskAssessment: queryParams.selectedRiskAssessment,
      _offset: 0,
      _count: queryParams._count
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.huddles.length !== nextProps.huddles.length) {
      let selectedHuddle;
      let selectedHuddleGroup;

      for (let i = 0; i < nextProps.huddles.length; ++i) {
        let huddleGroup = nextProps.huddles[i];
        let huddle = huddleGroup.dates.find((searchHuddle) => searchHuddle.id === this.state.queryParams.selectedHuddle);

        if (huddle) {
          selectedHuddle = huddle;
          selectedHuddleGroup = huddleGroup;
          break;
        }
      }

      this.setState({
        selectedHuddleGroup,
        selectedHuddle,
        nextHuddleForPatients: nextHuddleForPatients(nextProps.huddles)
      });
    }

    if (this.props.populations.length !== nextProps.populations.length) {
      let querySelectedPopulations = this.state.queryParams.selectedPopulations || [];
      this.setState({
        selectedPopulations: nextProps.populations.filter((population) => querySelectedPopulations.indexOf(population.id) !== -1)
      });
    }

    if (this.props.riskAssessments.length !== nextProps.riskAssessments.length) {
      this.setState({
        selectedRiskAssessment: nextProps.riskAssessments[0]
      });
    }

    if (this.state.loading && nextProps.riskAssessments.length > 0 && nextProps.populations.length > 0 && nextProps.huddles.length > 0 && nextProps.patients.length > 0) {
      this.setState({ loading: false });
    }
  }

  renderedPopulation() {
    if (this.state.selectedPopulations.length > 0) {
      let separator = <strong>{this.state.queryParams.populationSelectorType === 'union' ? ' OR ' : ' AND '}</strong>;
      return (
        <tr>
          <td className="list-label">Population:</td>
          <td>{joinWithSeparator(this.state.selectedPopulations.map((pop) => pop.name), separator)}</td>
        </tr>
      );
    }
  }

  renderedHuddle() {
    if (this.state.selectedHuddle != null) {
      return (
        <tr>
          <td className="list-label">Huddle:</td>
          <td>{this.state.selectedHuddleGroup.name} ({moment(this.state.selectedHuddle.datetime).format('ll')})</td>
        </tr>
      );
    }
  }

  renderedNameSearch() {
    if (this.state.patientSearch != null && this.state.patientSearch !== '') {
      return (
        <tr>
          <td className="list-label">Patient Name Search:</td>
          <td>{this.state.patientSearch}</td>
        </tr>
      );
    }
  }

  patientRisk(patient, riskAssessment) {
    let risk = riskAssessment.patients.find((patientRisk) => {
      return patientRisk.id === patient.id;
    });

    return risk.risks[0].value;
  }

  renderedPatients() {
    if (this.props.patients.length == 0) { return <div>No patients</div>; }

    return this.props.patients.map((patient) => {
      let nextHuddle = this.state.nextHuddleForPatients[patient.id];

      return (
        <tr key={patient.id}>
          <td>{patient.name.full}</td>
          <td>{patient.gender}</td>
          <td>{patient.age} yrs</td>
          <td>{nextHuddle ? moment(nextHuddle.huddle.datetime).format('ll') : ''}</td>
          <td>{nextHuddle ? nextHuddle.huddlePatient.reason.text : ''}</td>
          <td>{/* TODO: huddle patient reviewed */}</td>
          <td>{this.patientRisk(patient, this.state.selectedRiskAssessment)}</td>
        </tr>
      );
    });
  }

  printList(event) {
    event.preventDefault();
    window.print();
  }

  closePrintPopout(event) {
    event.preventDefault();
    window.close();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container print-patient-list">
          <PageHeader title="Patients"/>
          <div className="text-center">
            <FontAwesome name="spinner" size="3x" spin pulse />
          </div>
        </div>
      );
    }

    return (
      <div className="container print-patient-list">
        <PageHeader title="Patients"/>
        <table>
          <tbody>
            <tr>
              <td className="list-label">Risk Assessment:</td>
              <td>{this.state.selectedRiskAssessment.name}</td>
            </tr>

            {this.renderedPopulation()}
            {this.renderedHuddle()}
            {this.renderedNameSearch()}

            <tr>
              <td className="list-label">Sort By:</td>
              <td>
                {this.state.sortOption.name} ({this.state.queryParams.sortAscending === 'true' ? 'ascending' : 'descending'})
              </td>
            </tr>

            <tr>
              <td className="list-label">Total Patients:</td>
              <td>{this.state.queryParams._count}</td>
            </tr>
          </tbody>
        </table>

        <div className="hide-in-print text-center">
          <button className="btn btn-primary" onClick={this.printList}>Print</button>
          <button className="btn btn-ie-lg btn-default" onClick={this.closePrintPopout}>Close Window</button>
        </div>

        <table className="table table-striped">
          <thead>
            <tr className="th-no-bottom">
              <th colSpan="3">&nbsp;</th>
              <th colSpan="3" className="text-center th-border-bottom">Next Huddle</th>
              <th>&nbsp;</th>
            </tr>

            <tr className="th-no-top">
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Reviewed</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {this.renderedPatients()}
          </tbody>
        </table>

        <div className="text-center">
          <button className="hide-in-print btn btn-primary" onClick={this.printList}>Print</button>
          <button className="hide-in-print btn btn-ie-lg btn-default" onClick={this.closePrintPopout}>Close Window</button>
        </div>
      </div>
    );
  }
}

PrintPatientList.displayName = 'PrintPatientList';

PrintPatientList.propTypes = {
  populations: PropTypes.arrayOf(populationProps).isRequired,
  huddles: PropTypes.arrayOf(huddleGroupProps).isRequired,
  riskAssessments: PropTypes.arrayOf(riskAssessmentProps).isRequired,
  patients: PropTypes.arrayOf(patientProps).isRequired,
  fetchPopulations: PropTypes.func.isRequired,
  fetchHuddles: PropTypes.func.isRequired,
  fetchPatients: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPopulations,
    fetchHuddles,
    fetchPatients
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    populations: state.population.populations,
    huddles: state.huddle.huddles,
    riskAssessments: state.riskAssessment.riskAssessments,
    patients: state.patient.patients
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintPatientList);

function queryParamsHash() {
  let params = {};
  let search = window.location.search.substring(1);

  if (search === '') {
    return params;
  }

  let pieces = search.split('&');
  for (let i = 0; i < pieces.length; ++i) {
    let keyval = pieces[i].split('=');

    if (keyval.length !== 2) {
      continue;
    }

    let key = decodeURIComponent(keyval[0]);
    let value = decodeURIComponent(keyval[1]);

    if (key.substr(-2) === '[]') {
      key = key.substr(0, key.length - 2);
      if (params[key] == null) {
        params[key] = [];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }

  return params;
}

function joinWithSeparator(array, separator) {
  let newArray = new Array((array.length * 2) - 1);

  for (let i = 0, j = 0; i < array.length; ++i, j += 2) {
    let last = i === array.length - 1;

    newArray[j] = array[i];
    if (!last) {
      newArray[j + 1] = cloneElement(separator, { key: i });
    }
  }

  return newArray;
}

function nextHuddleForPatients(huddleGroups) {
  let patientHuddleMapping = {};

  for (let i = 0; i < huddleGroups.length; ++i) {
    let huddleGroup = huddleGroups[i];
    let huddles = huddleGroup.dates;

    for (let j = 0; j < huddles.length; ++j) {
      let huddle = huddles[j];
      let huddleDate = moment(huddle.datetime);

      if (!isTodayOrAfter(huddleDate)) {
        continue;
      }

      let { patients } = huddle;

      for (let k = 0; k < patients.length; ++k) {
        let huddlePatient = patients[k];

        if (patientHuddleMapping[huddlePatient.id] == null || huddleDate.isBefore(patientHuddleMapping[huddlePatient.id].huddle.datetime, 'day')) {
          patientHuddleMapping[huddlePatient.id] = { huddleGroup, huddle, huddlePatient };
        }
      }
    }
  }

  return patientHuddleMapping;
}
