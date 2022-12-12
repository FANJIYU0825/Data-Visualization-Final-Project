import { piechart } from "./mainpie.js";
import { draw_scatt1, draw_scatt3 } from "./drawscatter.js";
import { draw_scatt2 } from "./drawscatter.js";
import { frame_init } from "./init.js";
const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
const svg1 = d3
  .select("#pie")
  .append("svg")
  .attr("width", FWith - 300)
  .attr("height", FHeight);

const g1 = svg1
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
var g2 = frame_init('area1')
var g3 = frame_init('area2')
var g4 = frame_init('area3')
d3.csv(
  "./persudu/data_clean.csv",
  d3.autoType
).then(function (data) {
  
  d3.json("./persudu/subcount.json").then(function(count){
    var piechar= piechart(count, g1);
    draw_scatt1(data,g2);
    draw_scatt2(data,g3);
    draw_scatt3(data,g4);
  })
});
