/* eslint no-unused-vars: 0 */
import NcdMap from './map.js';

const Bootstrap = function Bootstrap() {
  const mapEl = document.getElementById('map');

  if (mapEl) {
    const myMap = new NcdMap(mapEl);
  }
};

window.Bootstrap = Bootstrap;
