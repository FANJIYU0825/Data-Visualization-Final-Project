// import { brush_scatter } from "./interaction.js";
import { top_tip1, top_tip3 } from "./interaction.js";
import { top_tip2 } from "./interaction.js";

const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 100, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

export function draw_scatt1(data, g) {
  //text
  g.append("text")
    .attr("x", 200)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Size");
  // var brush = brush_scatter(g);
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet1);

  g.append("g")
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("Price");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Ratting");
  //產生xylabel
  // yscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([d3.min(data, (d) => d.Price), 20])
    .range([0, HEIGHT]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Rating), d3.max(data, (d) => d.Rating)])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (d.Type == "Paid" && 10 >= d.Price) {
        return xscale(d.Price);
      }
    })
    .attr("cy", function (d) {
      if (d.Type == "Paid") return yscale(d.Rating);
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (d.Category == "BUSINESS") return colorscale(0);
      else if (d.Category == "FAMILY") return colorscale(1);
      else if (d.Category == "GAME") return colorscale(2);
      else if (d.Category == "MEDICAL") return colorscale(3);
      else if (d.Category == "TOOLS") return colorscale(4);
      else return colorscale(5);
    });

  var tip = top_tip1();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  // circleG.call(brush);
}
export function draw_scatt2(data, g) {
  //text
  g.append("text")
    .attr("x", 200)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("price");
  // var brush = brush_scatter(g);
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet1);

  g.append("g")
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("Price");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Size");
  //產生xylabel
  // yscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([d3.min(data, (d) => d.Rating), d3.max(data, (d) => d.Rating)])
    .range([0, HEIGHT]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Size), d3.max(data, (d) => d.Size)])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (d.Type == "Paid") {
        return xscale(d.Rating);
      }
    })
    .attr("cy", function (d) {
      if (d.Type == "Paid") return yscale(d.Size);
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (d.Category == "BUSINESS") return colorscale(0);
      else if (d.Category == "FAMILY") return colorscale(1);
      else if (d.Category == "GAME") return colorscale(2);
      else if (d.Category == "MEDICAL") return colorscale(3);
      else if (d.Category == "TOOLS") return colorscale(4);
      else return colorscale(5);
    });

  var tip = top_tip2();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  // circleG.call(brush);
}
export function draw_scatt3(data, g, filter) {
  //text
  if (filter == undefined) var Filter = "FAMILY";
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }

  // var brush = brush_scatter(g);
  //https://github.com/d3/d3-scale-chromatic
  //https://d3-graph-gallery.com/graph/custom_color.html
  var Color = d3
    .scaleSequential()
    .domain([100, 1])
    .interpolator(d3.interpolateYlOrBr);

  g.append("g")
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("Family");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Size");
  //產生xylabel
  // yscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([d3.min(data, (d) => d.Rating), d3.max(data, (d) => d.Rating)])
    .range([0, HEIGHT]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Size), d3.max(data, (d) => d.Size)])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return xscale(d.Rating);
      }
    })
    .attr("cy", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return yscale(d.Size);
      }
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return Color(d.Size);
      }
    });

  var tip = top_tip2();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { circles: circles };
}
export function draw_scatt3_1(data, g, filter) {
  //text
  if (filter == undefined) var Filter = "FAMILY";
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }

  // var brush = brush_scatter(g);
  //https://github.com/d3/d3-scale-chromatic
  //https://d3-graph-gallery.com/graph/custom_color.html
  var Color = d3
    .scaleSequential()
    .domain([100, 1])
    .interpolator(d3.interpolateYlOrBr);

  g.append("g")
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("Family");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Size");
  //產生xylabel
  // yscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([d3.min(data, (d) => d.Rating), d3.max(data, (d) => d.Rating)])
    .range([0, HEIGHT]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Size), d3.max(data, (d) => d.Size)])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return xscale(d.Rating);
      }
    })
    .attr("cy", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return yscale(d.Size);
      }
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (d.Type != "Free" && d.Rating != null && d.Category == Filter) {
        return Color(d.Size);
      }
    });

  var tip = top_tip2();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { circles: circles };
}
function time_formate(data) {}
export function draw_scatt4(data, g, filters) {
  //text

  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet1);

  // var brush = brush_scatter(g);
  //https://github.com/d3/d3-scale-chromatic
  //https://d3-graph-gallery.com/graph/custom_color.html

  g.append("g")
    .append("text")
    .attr("x", WIDTH / 2 + 5)
    .attr("y", HEIGHT + 20 + 10)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Last Update");
  g.append("text")
    .attr("x", -(HEIGHT / 2) - 5)
    .attr("y", -25)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Reviews");
  //產生xylabel
  // yscale
  var mean = d3.mean(data, (d) => d["Reviews"]);
  const xscale = d3
    .scaleLinear()

    .domain([d3.min(data, (d) => d["Reviews"]), mean])
    .range([0, HEIGHT]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d["Rating"]),
      d3.max(data, (d) => d["Rating"]),
    ])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (filters == undefined) {
        if (d.Type != "Free" && d["Reviews"] != null && mean >= d["Reviews"]) {
          return xscale(d["Reviews"]);
        } else if (filters != undefined) {
          if (
            d.Type != "Free" &&
            d["Reviews"] != null &&
            mean >= d["Reviews"] &&
            d.Category == filters
          )
            return xscale(d["Reviews"]);
        }
      }
    })
    .attr("cy", function (d) {
      if (filters == undefined) {
        if (d.Type != "Free" && d["Reviews"] != null && mean >= d["Reviews"]) {
          return yscale(d["Rating"]);
        } else if (filters != undefined) {
          if (
            d.Type != "Free" &&
            d["Reviews"] != null &&
            mean >= d["Reviews"]
          ) {
            return yscale(d["Rating"]);
          }
        }
      }
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (d.Category == "BUSINESS") return colorscale(0);
      else if (d.Category == "FAMILY") return colorscale(1);
      else if (d.Category == "GAME") return colorscale(2);
      else if (d.Category == "MEDICAL") return colorscale(3);
      else if (d.Category == "TOOLS") return colorscale(4);
      else return colorscale(5);
    });

  var tip = top_tip3();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { circles: circles };
}
