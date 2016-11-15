// use <i></i>
export function getPatientAgeIcon(age) {
  if (age <= 3) {
    return 'fc-baby';
  } else if (age <= 17) {
    return 'fc-child';
  } else if (age <= 64) {
    return 'fc-adult';
  } else if (age >= 65) {
    return 'fc-elderly';
  }

  return 'fa fa-birthday-cake';
}

// use <FontAwesome />
export function getPatientGenderIcon(gender) {
  if (gender === 'male') {
    return 'male';
  } else if (gender === 'female') {
    return 'female';
  }

  return 'user';
}

// use <FontAwesome />
export function getHuddleReasonIcon(reason) {
  if (reason === 'ROLLOVER') {
    return 'arrow-circle-o-right';
  } else if (reason === 'MANUAL_ADDITION') {
    return 'pencil';
  } else if (reason === 'RECENT_ENCOUNTER') {
    return 'hospital-o';
  } else if (reason === 'RISK_SCORE') {
    return 'pie-chart';
  }
}
