"use strict";

/**
 *
 * @namespace ncd.Config
 * @description namespace for the nasa climate data frontend
 * Nasa Climate Data
 *
 */
var ncd = (function(_ncd, _d3){

    var d3 = _d3 || d3;
    if (!d3) { throw new Error; }

    var _formatDate = function(arg){
        var d = d3.time.format('%Y-%m-%dT%H:%M:%S').parse(arg);
        return d;
    };
    
    var chartEl = null, scale = { "all": [], "ticks": [] };

    var linegraph = function(data, el){

        var paddings = { top: 10, right: 10, bottom: 60, left: 60 };
        var margins = { top: 10, right: 10, bottom: 10, left: 10 };

        var bbox = el.getBoundingClientRect();
        var dims = {width: bbox.width - (paddings.left + paddings.right), height: bbox.height - (paddings.top + paddings.bottom)};
        if (dims.width < 400) { dims.width = 400; }
        if (dims.height < 300) { dims.height = 300; }

        var range = { "all": [], "ticks": [] };
        var seriesData = { };
        var measures = data.metadata.measures;

        for (var a in data.data){
            data.data[a].forEach(function(d){
                var values = [];
                measures.forEach(function(measure){
                    if (d.hasOwnProperty(measure)){
                        var val = (measure === "tasmin" || measure === "tasmax") ? (parseFloat(d[measure]) - 273.15) : parseFloat(d[measure]);
                        values.push(val);
                        range["ticks"].push(_formatDate(d.date));
                        seriesData[measure] = (function(){
                            if (seriesData[measure]) { return seriesData[measure].concat([{value: val, tick: d.date }]); }  
                            return [{value: val, tick: d.date }];
                        }());
                    }
                });
            });
        }

        var _setupChart = function(_el){

            if (chartEl !== null) { return chartEl; }
            
            scale.ticks = d3.time.scale().domain(d3.extent(range.ticks)).range([0 + paddings.left, dims.width - (paddings.left + paddings.right)]);
            scale.measures = d3.scale.linear().domain([100, -100]).range([0 + paddings.bottom, dims.height - (paddings.top + paddings.bottom)]);

            
            var yAxis = d3.svg.axis()
                .scale(scale.measures)
                .orient("left")
		        .tickSize(10, 10);

            var xAxis = d3.svg.axis()
                .scale(scale.ticks)
                .orient("bottom")
		        .tickSize(10, 10);

            var svg = d3.select(_el).append("svg").attr("class", "chart-container").attr("width", dims.width).attr("height", dims.height);
            var g_chart = svg.append("g").attr("class", "chart").attr("transform", "translate("+"0"+","+paddings.top+")");
            var g_yAxis = svg.append("g").attr("class", "y-axis").attr("transform", "translate("+paddings.left+","+paddings.top+")")
                .call(yAxis);
            var g_xAxis = svg.append("g").attr("class", "x-axis").attr("transform", "translate("+"0"+","+(dims.height - paddings.bottom)+")")
                .call(xAxis);

            return g_chart;
        };
        
        chartEl = _setupChart(el);




        var paths = measures.map(function(measure){
            var path = chartEl.append("path")
                .datum(
                    seriesData[measure].sort(function(a,b){
                        if (_formatDate(a.tick) > _formatDate(b.tick)) { return 1 };
                        if (_formatDate(a.tick) < _formatDate(b.tick)) { return -1 };
                        return 0;
                    })
                )
                .attr("class", measure.toString())
                .attr("d", d3.svg.line()
                      .y(function(d){
                          var x = scale.measures(d.value);
                          return x;
                      })
                      .x(function(d){
                          var y = scale.ticks(_formatDate(d.tick));
                          return y;
                      })
                     );
            return path;
        });

        
        
    };
    
    _ncd.Graph = {
        DrawYear: function(data){
            var mydata = (JSON.parse(data));
            var myel = document.getElementById("mainGraph");
            if (!(mydata.metadata && mydata.data && myel.hasAttribute)){ return; }

            var _l = new linegraph(mydata, myel);
            
        }
    };

    return _ncd;

}(ncd || {}, d3 || null));
