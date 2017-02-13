import moment from 'moment';

// Checks if something has happened in the last val*period
export function inLast(field, val, period) {
  return this.sinceDate(field, val, period, new Date());
}

// Checks if something will happen in the next val*period
export function inNext(field, val, period) {
  return this.untilDate(field, val, period, new Date());
}

// Checks if something happened in val*period from startDate
export function sinceDate(field, val, period, startDate) {
  let periodAgo = moment(startDate).subtract(val, period).toDate();
  return new Date(field) > periodAgo;
}

export function untilDate(field, val, period, startDate) {
  let periodTo = moment(startDate).add(val, period).toDate();
  return new Date(field) < periodTo;
}

// Checks if something has occured, ie the date isn't in the future
export function hasOccured(field) {
  if (field === null) { return false; }
  return new Date(field) <= new Date();
}

export function isActive(field) {
  return field === undefined || !this.hasOccured(field);
}
