export function change_picture(g,opt_v){
    var url = './fig/'+opt_v+'.jpg'
    g.append("image")
    .attr('class', "sth")
    .attr('x',-50)
    .attr('y',-100)
    .attr('width',500)
    .attr('height',600)
    // .attr("transform", entry.childNodes[0].getAttribute("transform"))
    // .attr('clip-path', 'url(#'+('clip'+clipPathId)+')')
    .attr("xlink:href", url)
    g.append("text")
    .attr("x", 180)
    .attr("y", 10)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text(opt_v);
}