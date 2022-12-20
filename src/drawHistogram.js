import { selectbar, top_tip4 } from "./interaction.js";
const FWith = 600,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 30, RIGHT: 100, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

export function draw_histamgram(data, Count, g, brus, opt_v) {
  //add text
  if (brus == 1) {
    g.selectAll("text").remove();
    g.selectAll(".xax").remove();
    g.selectAll(".yax").remove();
  }
  
  g.append("text")
    .attr("x", 200)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text(opt_v);
  
  var result = [];
  for (var i in Count) {
    result.push([i, Count[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var color = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet3);

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

    .domain([d3.min(data, (d) => d["Reviews"]), 400])

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
      if (opt_v != undefined) {
        return color(opt_v);
      } else {
        return "#69b3a2";
      }
    });
    var tip = top_tip4()
    rect.call(tip)
    rect.on("mousemove", tip.show).on("mouseout", tip.hide);
    
}
