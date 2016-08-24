import NcdMap from './map.js';

const Bootstrap = function(){

    var mapEl = document.getElementById("map");
    if (mapEl){
        var myMap = new NcdMap(mapEl);
    }
};

window.Bootstrap = Bootstrap;
