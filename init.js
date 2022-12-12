
const FWith = 800,
FHeight = 400;
const FLeftTopX = 10,
FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
export function frame_init(area) {
    const svg = d3
      .select("#" + area + "")
      .append("svg")
      .attr("width", FHeight)
      .attr("height", FHeight);
  
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${FLeftTopX + MARGIN.LEFT}, ${
          FLeftTopY + MARGIN.TOP
        })scale(.9,.6) `
      );
    return g;
  }