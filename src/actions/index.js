import fetch from 'isomorphic-fetch';

export function retrieve(url) {
  return new Promise((resolve) =>
    fetch(url, { credentials: 'same-origin' })
      .then(req => req.json())
      .then(json => resolve(json))
  );
}
