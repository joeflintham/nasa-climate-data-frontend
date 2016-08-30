/* eslint no-unused-vars: 0 */
import Config from './config.js';
import XHR from './xhr.js';

export function GetByCoords (coords = {}) {
  if (!(coords.lat && coords.lng)) {
    return;
  }

  // request the marker info with AJAX for the current bounds
  const params = [
    'year=2005',
    'measures=tasmin',
    'latmin=' + coords.lat,
    'lonmin=' + coords.lng
  ];

  return new Promise((resolve, reject) => {
    let apiCall = Config.apiRoot + Config.apiPath;
    apiCall = apiCall + '?' + params.join('&');

    const xhr = new XHR();
    xhr.onload = (d) => resolve(xhr.response);
    xhr.error = (err) => reject(err);

    xhr.open('GET', apiCall, true);
    xhr.send(null);
  });
}
