export function dropdown(data) {
  var dropdown_button = d3.select("#botton").append("select");
  var result = [];
  for (var i in data) {
    result.push([i, data[i]]);
  }
  var legentext = [];
  legentext.push("ALL")
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  dropdown_button // Add a button
    .selectAll("myOptions")
    // Next 4 lines add 6 options = 6 colors
    .data(legentext)
    .join("option")

    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    });
  return { bottom: dropdown_button };
}
