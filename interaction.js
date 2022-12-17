export function isbrushed(coords, cx, cy) {
  var x0 = coords[0][0],
    x1 = coords[1][0],
    y0 = coords[0][1],
    y1 = coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}
export function isbrushedX(coords, cx, cy) {
  var x0 = coords[0],
    x1 = coords[1];
  return cx >= x0 && cy <= x1;
}

function endbrushed() {
  // bars
  //   .data(genders)
  //   .attr("x", 10)
  //   .attr("y", (d, i) => i * 20)
  //   .attr("width", (d) => d / 2)
  //   .attr("height", 15);
}

export function selectbar(rect) {
  var colors = ["blue"];
  rect
    .on("mouseover", function (d, i) {
      d3.select(this).style("fill", colors[i]);
    })
    .on("mouseleave", function () {
      d3.select(this).style("fill", "#69b3a2");
    });
}
export function top_tip(Parra) {
  if (Parra == "pie") {
    var tool = pie_tool();
    return tool;
  }
}
export function top_tip1(Parra) {
 
    var tool = scatter_tool()
    return tool
}
export function top_tip2(Parra) {
 
    var tool = scatter1_tool()
    return tool
}
export function top_tip3(Parra) {
 
    var tool = scatter2_tool()
    return tool
}

function pie_tool() {
  // return the string
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(
      (d) =>
        // d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm
        "<font color ='red'> Category</font>:" +
        "<space>" +
        d.data.key +
        "<br> Count:<space> " +
        d.value
    );

  return tip;

  //
}
function scatter_tool() {
  // return the string
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(
      (d) =>
        // d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm
        "<font color ='red'> Category</font>:" +
        "<space>" +
        d.Category +
        "<br> Ratting:<space> " +
        d.Rating+
        "<br> Price:<space> " +
        d.Price
    );

  return tip;

  //
}
function scatter1_tool() {
  // return the string
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(
      (d) =>
        // d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm
        "<font color ='red'> Category</font>:" +
        "<space>" +
        d.Category +
        "<br> Ratting:<space> " +
        d.Rating+
        "<br> Size:<space> " +
        d.Size+
        "<br> Type:<space> " +
        d.Type

    );

  return tip;

  //
}
function scatter2_tool() {
  // return the string
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(
      (d) =>
        // d.ptsNorm < d.astNorm && d.rebNorm < d.astNorm
        "<font color ='red'> Category</font>:" +
        "<space>" +
        d.Category +
        "<br> Reviews:<space> " +
        d.Reviews
    );

  return tip;

  //
}
