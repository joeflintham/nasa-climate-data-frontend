/* eslint no-unused-vars: 0 */
/* eslint new-cap: 0 */
import API from './api.js';
import Graph from './graph.js';

const NcdMap = (el) => {
  const id = el.getAttribute('id');
  const map = L.map(id).setView([51.505, -0.09], 5); // generic london
  const overlay = map.getPanes().overlayPane;

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  map.on('click', (e) => {
    const div = document.createElement('div');
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svg = div.appendChild(svgEl);

    const gEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const g = svgEl.appendChild(gEl);
    g.setAttribute('transform', 'translate(11,11)');

    const cEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const c = gEl.appendChild(cEl);
    c.setAttribute('class', 'clicked-point');
    c.setAttribute('r', '10px');

    const icon = L.divIcon({ className: 'clicked-point-div', iconSize: L.point(22, 22), html: div.innerHTML });
    L.marker([e.latlng.lat, e.latlng.lng], { icon }).addTo(map);


    API.GetByCoords(e.latlng, Graph.DrawYear);
  });
};

export default NcdMap;
