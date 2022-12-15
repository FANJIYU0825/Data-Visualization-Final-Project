// Create data = list of groups
var allGroup = ["yellow", "blue", "red", "green", "purple", "black"]

// Initialize the button
var dropdownButton = d3.select("#dataviz_builtWithD3")
  .append('select')

// add the options to the button
dropdownButton // Add a button
  .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
 	.data(allGroup)
  .enter()
	.append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// Initialize a circle
var zeCircle = d3.select("#dataviz_builtWithD3")
  .append("svg")
  .append("circle")
    .attr("cx", 100)
    .attr("cy", 70)
    .attr("stroke", "black")
    .style("fill", "yellow")
    .attr("r", 20)

// A function that update the color of the circle
function updateChart(mycolor) {
  zeCircle
    .transition()
    .duration(1000)
    .style("fill", mycolor)
}

// When the button is changed, run the updateChart function
dropdownButton.on("change", function(d) {

    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")

    // run the updateChart function with this selected option
    updateChart(selectedOption)
})

