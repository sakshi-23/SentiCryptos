
var margin = {top: 10, right: 10, bottom: 100, left: 60},
    margin2 = {top: 280, right: 10, bottom: 20, left: 60},
    width = 550 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    height2 = 350 - margin2.top - margin2.bottom;

var color = d3.scale.category10();
var data;
var parseDate = d3.time.format("%Y%m").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%m/%d")),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom").tickFormat(d3.time.format("%m/%d")),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush);

var line = d3.svg.line()
    .defined(function(d) { return !isNaN(d.close); })
    .interpolate("cardinal")
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.close); });

var line2 = d3.svg.line()
    .defined(function(d) { return !isNaN(d.close); })
    .interpolate("cardinal")
    .x(function(d) {return x2(d.time); })
    .y(function(d) {return y2(d.close); });
var focused ;
var context;




$(document).ready( function() {



    function getForecast(sym){


    $.get("https://min-api.cryptocompare.com/data/histoday?fsym="+sym+"&tsym=USD&limit=300&aggregate=1&e=CCCAGG", function(dat, status){


        $(".card-chart").html("");
        var svg = d3.select(".card-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);

        focused= svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        context = svg.append("g")
          .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        data= dat["Data"]
        var time=data[data.length-1]["time"]
        var close=data[data.length-1]["close"]
        for(var i in [0,1,2,3,4,5,6,]){
            data.push({"time":time+86400*(i+1),"close":close*getRandomArbitrary(0.7,1.3)})

        }


        function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }




        data.forEach(function(d) {
          d.time = new Date(d.time * 1000);
        });



        x.domain(d3.extent(data, function(d) { return d.time; }));
        y.domain([d3.min(data, function(c) { return Math.min(c.low)}),
                  d3.max(data, function(c) { return Math.min(c.high)}) ]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        var focuslineGroups = focused.append("path")
//            .data(data)
            .attr("class","line")
            .attr("d", line(data))

            .attr("clip-path", "url(#clip)");

        focused.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


        focused.append("g")
            .attr("class", "y axis")
            .call(yAxis);

             focused.append("line")
            .attr("x1",x(data[data.length - 7].time))
            .attr("y1",0)
            .attr("x2",x(data[data.length - 7].time))
            .attr("y2",400)
            .attr("stroke","white")
            .attr("stroke-width","2px");

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




    }

    getForecast('BTC');


  function getData(sym){


     $.get("https://min-api.cryptocompare.com/data/histominute?fsym="+sym+"&tsym=USD&limit=500&aggregate=3&e=CCCAGG", function(dat, status){

        $(".card-chart").html("");
        var svg = d3.select(".card-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);

        focused= svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        context = svg.append("g")
          .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        data= dat["Data"]
        data.forEach(function(d) {
          d.time = new Date(d.time * 1000);
        });


        x.domain(d3.extent(data, function(d) { return d.time; }));
        y.domain([d3.min(data, function(c) { return Math.min(c.low)}),
                  d3.max(data, function(c) { return Math.min(c.high)}) ]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        var focuslineGroups = focused.append("path")
//            .data(data)
            .attr("class","line")
            .attr("d", line(data))

            .attr("clip-path", "url(#clip)");

        focused.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focused.append("g")
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

    }

    $(".symbols").on("click",function(e){
    if(e.target.classList.value=="material-icons"){

        $(".card-content").removeClass("active");
        $(this).find(".card-content").addClass("active");
        getForecast($(this).attr("id"));
        $(".graph-name").html($(this).attr("id"))


    }
    else{

    $(".card-content").removeClass("active");
        $(this).find(".card-content").addClass("active");
        getData($(this).attr("id"));
        $(".graph-name").html($(this).attr("id"))

    }

    })



//    $("#BTC").trigger("click");

});

function brush() {
          x.domain(brush.empty() ? x2.domain() : brush.extent());
//          y.domain(brush.empty() ? x2.domain() : brush.extent());
          focused.selectAll("path.line").attr("d",  line(data));
          focused.select(".x.axis").call(xAxis);
          focused.select(".y.axis").call(yAxis);
    }


