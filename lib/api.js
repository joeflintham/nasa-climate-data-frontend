/* eslint no-unused-vars: 0 */
import Config from './config.js';
import XHR from './xhr.js';

const API = {
  GetByCoords: (coords = {}, callback) => {
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

    let apiCall = Config.apiRoot + Config.apiPath;
    apiCall = apiCall + '?' + params.join('&');

    const xhr = new XHR();
    xhr.onload = (d) => {
      if (callback) {
        callback(xhr.response);
      }
    };

    xhr.open('GET', apiCall, true);
    xhr.send(null);
  }
};

export default API;
