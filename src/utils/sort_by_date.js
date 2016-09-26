import moment from 'moment';

export default function sortByDate(method) {
  return (dateOne, dateTwo) => {
    let momentDateOne = moment(dateOne[method]);
    let momentDateTwo = moment(dateTwo[method]);

    if (momentDateOne > momentDateTwo) {
      return 1;
    } else if (momentDateOne < momentDateTwo) {
      return -1;
    } else {
      return 0;
    }
  };
}
