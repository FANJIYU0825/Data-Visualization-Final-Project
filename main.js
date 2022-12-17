import { piechart } from "./mainpie.js";
import { draw_scatt1, draw_scatt3,draw_scatt4 } from "./drawscatter.js";
import { draw_scatt2 } from "./drawscatter.js";
import { frame_init } from "./init.js";
import { dropdown } from "./dropdown_buttom.js";

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
  .attr("width", FWith )
  .attr("height", FHeight+200);

const g1 = svg1
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
var g2 = frame_init('area1')
var g3 = frame_init('area2')
var g4 = frame_init('area3')
var g5 = frame_init('Opionion')
d3.csv(
  "./persudu/data_clean.csv",
  d3.autoType
).then(function (data) {
  
  d3.json("./persudu/subcount.json").then(function(count){
 
    var botton=dropdown(count);
   
    var piechar= piechart(count, g1);
    draw_scatt1(data,g2);
    draw_scatt2(data,g3);
    //draw_scatt3(data,g4);
    draw_scatt4(data,g4);
    botton['bottom'].on("change", function() {
    
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
  
      // // run the updateChart function with this selected option
      // updateChart(selectedOption)
      //g4.selectAll(".NormScatter").remove();
      g3.selectAll(".NormScatter").remove();
      g2.selectAll(".NormScatter").remove();
      var selectList = []
      if (selectedOption != "ALL"){
        data.forEach(element => {
          if (element['Category'] == selectedOption){
            //console.log(element)
            selectList.push(element)
          }
          
        });
        
      }
      else{
        selectList = data
      }
      draw_scatt1(selectList,g2,selectedOption);
      draw_scatt2(selectList,g3,selectedOption);
      //draw_scatt3(selectList,g4,selectedOption);
  })
  
  })
});
