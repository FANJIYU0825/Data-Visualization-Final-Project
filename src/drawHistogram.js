import { selectbar } from "./interaction.js";
const FWith = 600,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 30, RIGHT: 100, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

export function draw_histamgram(data, g, brus,opt_v) {
  //add text
  if (brus == 1) {
    // g.selectAll("text").remove();
    g.selectAll(".xax").remove();
    g.selectAll(".yax").remove();
  }

  g.append("g")
    .append("text")
    .attr("x", WIDTH - 30)
    .attr("y", HEIGHT + 40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Update time");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Review");
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet3);
  //ycale

  //xsclae
  const xscale = d3
    .scaleTime()
    .domain([new Date("2016-01-01"), new Date("2018-08-08")])
    .range([0, WIDTH]);
  //   var maxvalue = data[source];
  //   histogram scale
  var xAxis = d3.axisBottom(xscale).tickFormat(function (date) {
    if (d3.timeYear(date) < date) {
      return d3.timeFormat("%b")(date);
    } else {
      return d3.timeFormat("%Y")(date);
    }
  });

  var mean = d3.mean(data, (d) => d["Reviews"]);
  const yscale = d3
    .scaleLinear()

    .domain([d3.min(data, (d) => d["Reviews"]),400])

    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);

  g.append("g").attr("class", "yax").call(yAxisCall);

  g.append("g")
    .attr("class", "xax")
    .call(xAxis)
    .attr("transform", "translate(0," + HEIGHT + ")");
  var histogram = d3
    .histogram()
    .value(function (d) {
      return d["Last Updated"];
    }) // I need to give the vector of value
    .domain(xscale.domain()) // then the domain of the graphic
    .thresholds(xscale.ticks(40)); // then the numbers of bins
  var bins = histogram(data);
  var rect = g
    .selectAll("rect")
    .data(bins)

    .join("rect")
    // .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + xscale(d.x0) + "," + yscale(d.length) + ")";
    })
    .attr("width", function (d) {
      return xscale(d.x1) - xscale(d.x0) - 1;
    })
    .attr("height", function (d) {
      return HEIGHT - yscale(d.length);
    })
    .style("fill", function (d) {
      if (opt_v == "BUSINESS") return colorscale(0);
      else if (opt_v == "FAMILY") return colorscale(1);
      else if (opt_v == "GAME") return colorscale(2);
      else if (opt_v == "MEDICAL") return colorscale(3);
      else if (opt_v == "TOOLS") return colorscale(4);
      else return colorscale(5);
    })
  // selectbar(rect);
  // g.call( d3.brushX()                     // Add the brush feature using the d3.brush function
  //       .extent( [ [0,100], [400,300] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  //     )
  // return { g: hisg, rect: rect, xscale: xscale, yscale: yscale };
}
export function draw_histamgram1(data, g, source, WIDTH, HEIGHT, tickv) {
  //add text
  g.append("input");
  g.append("text")
    .attr("x", 200)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text(source);

  //ycale

  if (source == "pts") {
    var ydomainMax = 40;
  } else {
    var ydomainMax = d3.max(data, (d) => d.draft_number);
  }
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.draft_number), ydomainMax])
    .range([HEIGHT, 0]);
  //xsclae
  const xscale = d3
    .scaleLinear()
    // .domain([0, 30])
    .domain([d3.min(data, (d) => d[source]), d3.max(data, (d) => d[source])])
    .range([0, HEIGHT]);
  //   var maxvalue = data[source];
  //   histogram scale

  var histogram = d3
    .histogram()
    .value(function (d) {
      return d[source];
    }) // I need to give the vector of value
    .domain(xscale.domain()) // then the domain of the graphic
    .thresholds(xscale.ticks(tickv)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);
  //   Y label
  var hisg = g.join("g");
  hisg
    .append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("umapY");
  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);

  g.append("g").call(yAxisCall);

  g.append("g")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  var rect = g
    .selectAll("rect")
    .data(bins)

    .join("rect")
    // .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + xscale(d.x0) + "," + yscale(d.length) + ")";
    })
    .attr("width", function (d) {
      return xscale(d.x1) - xscale(d.x0) - 1;
    })
    .attr("height", function (d) {
      return HEIGHT - yscale(d.length);
    })
    .style("fill", "#69b3a2");
  selectbar(rect);
  // g.call( d3.brushX()                     // Add the brush feature using the d3.brush function
  //       .extent( [ [0,100], [400,300] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  //     )
  return { g: hisg, rect: rect, xscale: xscale, yscale: yscale };
}
