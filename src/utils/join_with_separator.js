import { cloneElement } from 'react';

// Returns an array with the given separator in between the given array elements
// Allows separator to be React element
export default function joinWithSeparator(array, separator) {
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
