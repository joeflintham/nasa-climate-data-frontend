/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint new-cap: 0 */
if (!d3) {
  throw new Error();
}

const formatDate = (arg) => d3.time.format('%Y-%m-%dT%H:%M:%S').parse(arg);
const scale = { all: [], ticks: [] };

let chartEl = null;

const linegraph = (data, el) => {
  const paddings = { top: 0, right: 0, bottom: 60, left: 60 };
  const margins = { top: 0, right: 15, bottom: 0, left: 0 };

  const bbox = el.getBoundingClientRect();

  const dims = { width: bbox.width - (margins.left + margins.right), height: bbox.height - (margins.top + margins.bottom) };
  if (dims.width < 400) { dims.width = 400; }
  if (dims.height < 300) { dims.height = 300; }

  const range = { all: [], ticks: [] };
  const seriesData = { };
  const measures = data.metadata.measures;

  Object.keys(data.data).forEach((dataSource) => {
    data.data[dataSource].forEach((d) => {
      const values = [];
      measures.forEach((measure) => {
        let val;
        if ({}.hasOwnProperty.call(d, measure)) {
          val = (measure === 'tasmin' || measure === 'tasmax') ? (parseFloat(d[measure]) - 273.15) : parseFloat(d[measure]);
          values.push(val);
          range.ticks.push(formatDate(d.date));
          seriesData[measure] = (() => {
            if (seriesData[measure]) { return seriesData[measure].concat([{ value: val, tick: d.date }]); }
            return [{ value: val, tick: d.date }];
          })();
        }
      });
    });
  });

  const setupChart = (_el) => {
    if (chartEl !== null) { return chartEl; }

    scale.ticks = d3.time.scale().domain(d3.extent(range.ticks)).range([0 + paddings.left, dims.width]);
    scale.measures = d3.scale.linear().domain([100, -100]).range([0 + paddings.bottom, dims.height]);

    const yAxis = d3.svg.axis()
          .scale(scale.measures)
          .orient('left')
          .tickSize(10, 10);

    const xAxis = d3.svg.axis()
          .scale(scale.ticks)
          .orient('bottom')
          .tickSize(10, 10);

    const svg = d3.select(_el)
          .append('svg')
          .attr('class', 'chart-container')
          .attr('width', dims.width)
          .attr('height', dims.height);

    const g_chart = svg.append('g')
          .attr('class', 'chart')
          .attr('transform', 'translate(0,' + paddings.top + ')');

    const g_yAxis = svg.append('g')
          .attr('class', 'y-axis')
          .attr('transform', 'translate(' + paddings.left + ',' + paddings.top + ')')
          .call(yAxis);

    const g_xAxis = svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + dims.height + ')')
        .call(xAxis);

    return g_chart;
  };

  chartEl = setupChart(el);

  const paths = measures.map((measure) => {
    const path = chartEl.append('path')
          .datum(
            seriesData[measure].sort((a, b) => {
              if (formatDate(a.tick) > formatDate(b.tick)) { return 1; }
              if (formatDate(a.tick) < formatDate(b.tick)) { return -1; }
              return 0;
            })
          )
          .attr('class', measure.toString())
          .attr('d', d3.svg.line()
                .y((d) => scale.measures(d.value))
                .x((d) => scale.ticks(formatDate(d.tick)))
               );
    return path;
  });
};

const Graph = {
  DrawYear: (data) => {
    const mydata = (JSON.parse(data));
    const myel = document.getElementById('mainGraph');
    if (!(mydata.metadata && mydata.data && myel.hasAttribute)) {
      return;
    }

    const l = new linegraph(mydata, myel);
  }
};

export default Graph;
