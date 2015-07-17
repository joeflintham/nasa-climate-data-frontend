"use strict";

/**
 *
 * @namespace ncd.Config
 * @description namespace for the nasa climate data frontend
 * Nasa Climate Data
 *
 */
var ncd = (function(_ncd, mapLib){

    _ncd.NcdMap = function(el){
        var id = el.getAttribute("id");
        var map = mapLib.map(id).setView([51.505, -0.09], 5); // generic london
        var overlay = map.getPanes().overlayPane;
        
        mapLib.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

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
            
            _ncd.API.GetByCoords(e.latlng, _ncd.Graph.DrawYear);

        });
    };

    return _ncd;

}(ncd || {}, L || {}));

