// Converts query params from window.location.search URL into hash
export default function queryParamsHash() {
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
