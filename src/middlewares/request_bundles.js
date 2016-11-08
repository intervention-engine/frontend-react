import { nest } from 'd3-collection';


// This middleware is designed to munge up FHIR Bundles
// It returns an object with keys of the resourceType which contain all entries of that type

export default function () {
  return next => action => {
    if (action.payload && action.payload.data) {
      let { resourceType, entry, total, type, link } = action.payload.data;
      if (resourceType === 'Bundle' && entry) {
        let nesting = nest();
        nesting.key((d) => d.resourceType);
        let entries = nesting.entries(entry.map((d) => d.resource));
        let fhirData = {};
        entries.map((e) => {
          fhirData[e.key] = e.values;
        });
        action.payload.data = fhirData;
      }
      action.payload.data.Meta = {total, type, resourceType, link};

    }
    return next(action);
  };
}
