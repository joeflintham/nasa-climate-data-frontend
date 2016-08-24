import API from './api.js';
import Graph from './graph.js';

const NcdMap = function(el){
    var id = el.getAttribute("id");
    var map = L.map(id).setView([51.505, -0.09], 5); // generic london
    var overlay = map.getPanes().overlayPane;
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    map.on("click", function(e){

        var div = document.createElement("div");
        var svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svg = div.appendChild(svgEl);
        var gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var g = svgEl.appendChild(gEl);
        g.setAttribute("transform", "translate(11,11)");
        var cEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var c = gEl.appendChild(cEl);
        c.setAttribute("class", "clicked-point");
        c.setAttribute("r", "10px");
        var icon = L.divIcon({className: "clicked-point-div", iconSize: L.point(22,22), html: div.innerHTML});
        var div = L.marker([e.latlng.lat, e.latlng.lng], {icon: icon}).addTo(map);
        
        API.GetByCoords(e.latlng, Graph.DrawYear);

    });
};

export default NcdMap;
