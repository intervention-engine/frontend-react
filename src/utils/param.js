export default function param(hash) {
  let keys = Object.keys(hash);
  let params = new Array(keys.length);

  for (let i = 0; i < keys.length; ++i) {
    params[i] = `${encodeURIComponent(keys[i])}=${encodeURIComponent(hash[keys[i]])}`;
  }

  return params.join('&');
}
