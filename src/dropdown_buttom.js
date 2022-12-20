export function dropdown(data) {
  var dropdown_button = d3.select("#botton").append("select");
  
  var result = ["ALL","Free","Paid"];

  dropdown_button // Add a button
    .selectAll("myOptions")
    // Next 4 lines add 6 options = 6 colors
    .data(result )
    .join("option")

    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    });
  return { bottom: dropdown_button };
}
