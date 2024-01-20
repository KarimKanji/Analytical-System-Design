function _1(md){return(
md`# Analytical system design - Project 2
## Animated and interactive scatter plot
Karim Kanji IA-20`
)}

function _2(md){return(
md`### Loading the data that is going to be used for the plot`
)}

async function _data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("output.csv").text(), d3.autoType)
)}

function _4(Inputs,data){return(
Inputs.table(data)
)}

function _5(md){return(
md`While examining the data we quite quickly realize that different years have different statistics to analyze.
To better focus our analysis and for simplicity's sake there is a dropdown menu to choose between the years 2015 - 2016.`
)}

function _Channel(Inputs){return(
Inputs.select([2015, 2016], { label: "Select a year you wish to analyze: ", value: "2015" })
)}

function _data1(data,Channel){return(
data.filter((d) => d.year == Channel)
)}

function _8(md){return(
md`To reduce the dataset we use the rollup() method!`
)}

function _dataClean(d3,data){return(
d3.rollup(data, v => d3.sum(v,d => d["Score"]), d => d["Country or region"])
)}

function _ChannelTitle(Inputs,data){return(
Inputs.select(data.columns.slice(6,-40), {
  label: "",
  value: "Region"
})
)}

function _chart1(d3,width,height,d3tip,ChannelTitle,data1,scale,xAxis,yAxis,Channel,margin)
{
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible");

  //Create the tooltip
  const tooltip = d3tip()
    .style("background-color", "white")
    .style("padding", "0.5em")
    .style("box-shadow", "0 3px 4px rgba(0, 0, 0, 0.2)")
    .style("border-radius", "10px")
    .style("float", "left")
    .attr("class", "tooltip")
    .html(
      (event, d) => `
      <div style='float: right'>
        ${d["Country"]} <br>
        ${"Happiness rank: " + d["Happiness Rank"]} <br>
        ${"Exact happiness score: " + d["Happiness Score"]} <br>
        ${"Exact " + ChannelTitle + " value: " + d[ChannelTitle]}
      </div>`
    );

  svg.call(tooltip);

  //Draw the scatter plot with transitions
  svg
    .append("g")
    .selectAll("circle")
    .data(data1)
    .join("circle")
    .attr("cx", (d) => scale.x(d["Happiness Score"]))
    .style("fill", (d) => scale.c(d["Happiness Score"]))
    .style("opacity", 0.5)
    .attr("r", 0)
    .attr("cy", 10)
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide)
    .transition()
    .duration(3000)
    .delay((d, i) => i * 0.2)
    .attr("r", 35)
    .attr("cy", (d) => scale.y(d[ChannelTitle]))
    .transition()
    .duration(1000)
    .delay((d, i) => i * 0.2)
    .attr("r", 5)
    .style("opacity", 0.8)
    .attr("cy", (d) => scale.y(d[ChannelTitle]));

  //Call the axes
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  //Add some general titles to the axes
  svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height - 5})`)
    .append("text")
    .style("text-anchor", "middle")
    .text("Happiness score, " + "year: " + Channel)
    .attr("class", "x_text");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height / 2})rotate(-90)`)
    .append("text")
    .style("text-anchor", "middle")
    .text(ChannelTitle)
    .attr("class", "y_text");

  return svg.node();
}


function _scale(d3,data,margin,width,ChannelTitle,height)
{
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d["Happiness Score"]))
    .nice()
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[ChannelTitle]))
    .nice()
    .range([height - margin.bottom, margin.top]);

  const c = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d["Happiness Score"]))
    .nice()
    .range(["red", "blue"]);

  return { x: x, y: y, c: c };
}


function _xAxis(margin,d3,scale){return(
(g) =>
  g
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${margin.top})`)
    .call(
      d3
        .axisTop(scale.x)
        .tickValues([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8])
    )
)}

function _yAxis(width,margin,d3,scale){return(
g => g
    .attr("class", "y-axis")
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(d3.axisLeft(scale.y)
            .ticks(10))
)}

function _15(md){return(
md`## Appendix`
)}

function _d3(require){return(
require("d3@latest")
)}

function _d3tip(require){return(
require("d3-tip")
)}

function _margin(){return(
{ top: 30, right: 30, bottom: 30, left: 10 }
)}

function _height(){return(
500
)}

function _formatNumber(d3){return(
d3.format(".0")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["output.csv", {url: new URL("./files/eb3c8b9122612db53da66c3c08c681d3ceb432fc56b246c84a3fea99ed7dadcd660d6255e92dc6c6441222be368fd1946b460eec3a09790259d1802bf78d27db.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer()).define(["Inputs","data"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof Channel")).define("viewof Channel", ["Inputs"], _Channel);
  main.variable(observer("Channel")).define("Channel", ["Generators", "viewof Channel"], (G, _) => G.input(_));
  main.variable(observer("data1")).define("data1", ["data","Channel"], _data1);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("dataClean")).define("dataClean", ["d3","data"], _dataClean);
  main.variable(observer("viewof ChannelTitle")).define("viewof ChannelTitle", ["Inputs","data"], _ChannelTitle);
  main.variable(observer("ChannelTitle")).define("ChannelTitle", ["Generators", "viewof ChannelTitle"], (G, _) => G.input(_));
  main.variable(observer("chart1")).define("chart1", ["d3","width","height","d3tip","ChannelTitle","data1","scale","xAxis","yAxis","Channel","margin"], _chart1);
  main.variable(observer("scale")).define("scale", ["d3","data","margin","width","ChannelTitle","height"], _scale);
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","scale"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["width","margin","d3","scale"], _yAxis);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("d3tip")).define("d3tip", ["require"], _d3tip);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("formatNumber")).define("formatNumber", ["d3"], _formatNumber);
  return main;
}
