
var margin = {top: 10, right: 10, bottom: 100, left: 60},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 730 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var color = d3.scale.category10();

var parseDate = d3.time.format("%Y%m").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush);

var line = d3.svg.line()
    .defined(function(d) { return !isNaN(d.close); })
    .interpolate("cubic")
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.close); });

var line2 = d3.svg.line()
    .defined(function(d) { return !isNaN(d.close); })
    .interpolate("cubic")
    .x(function(d) {return x2(d.time); })
    .y(function(d) {return y2(d.close); });

var svg = d3.select(".card-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
$(document).ready( function() {





     $.get("https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG", function(data, status){


        data= data["Data"]
        data.forEach(function(d) {
          d.time = new Date(d.time * 1000);
        });


        x.domain(d3.extent(data, function(d) { return d.time; }));
        y.domain([d3.min(data, function(c) { return Math.min(c.low)}),
                  d3.max(data, function(c) { return Math.min(c.high)}) ]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        var focuslineGroups = focus.append("path")
//            .data(data)
            .attr("class","line")
            .attr("d", line(data))

            .attr("clip-path", "url(#clip)");

        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var contextlineGroups = context.append("path")
            .data(data)
            .attr("class", "line")
             .attr("d", line2(data))

            .attr("clip-path", "url(#clip)");

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);



        context.append("g")
            .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);


    });

});

function brush() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.selectAll("path.line").attr("d",  function(d) {return line(d.close)});
  focus.select(".x.axis").call(xAxis);
  focus.select(".y.axis").call(yAxis);
}