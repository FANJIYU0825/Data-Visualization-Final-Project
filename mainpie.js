import { top_tip } from "./interaction.js";
const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

function legendboard(g, domain) {
  var circle = d3.symbol().type(d3.symbolCircle)();
  // var domainlen = Object.keys(domain).length
  var result = [];
  for (var i in domain) {
    result.push([i, domain[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var legenuse = g.append("g");
  var legendboard = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet1);
  var legendLinear = d3
    .legendColor()
    .shape("path", circle)
    .orient("vertical")
    .shapePadding(6)
    .scale(legendboard);
  legenuse
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(240,10)");
  legenuse.selectAll(".legendLinear").call(legendLinear);
}
export function piechart(data, g) {
  //legendboard
  legendboard(g, data);

  // circle size
  var radius = Math.min(FWith, FHeight) / 2 - 40;

  var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet1);
  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));
  var pie = g
    .selectAll("whatever")
    .data(data_ready)

    .join("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 20)
    .attr("transform", "translate(60,200)");
  // tool tip
  var tip = top_tip('pie');
  pie.call(tip);
  pie.on("mousemove", tip.show).on("mouseout", tip.hide);
}
