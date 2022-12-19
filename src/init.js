
const FWith = 600,
FHeight = 400;
const FLeftTopX = 10,
FLeftTopY = 10;
const MARGIN = { LEFT: 30, RIGHT: 10, TOP: 10, BOTTOM: 10 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
export function frame_init(area) {
    const svg = d3
      .select("#" + area + "")
      .append("svg")
      .attr("width", FWith)
      .attr("height", FHeight);
  
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${FLeftTopX + MARGIN.LEFT}, ${
          FLeftTopY + MARGIN.TOP
        }) `
      );
    return g;
  }