import define1 from "./79750b3b8e929d9d@239.js";

function _1(md){return(
md`# Analytical system design - Project 1
## EDA using arquero.js and plot.js
Karim Kanji - IA20`
)}

function _2(md){return(
md`### Arquero Import`
)}

function _4(md){return(
md`### Import dataset from Github (Life expectancy)`
)}

async function _data(aq,FileAttachment){return(
aq.fromCSV(await FileAttachment("Life Expectancy Data.csv").text())
)}

function _6(md){return(
md`### View, filter, rename, group, order and dataset reduction`
)}

function _7(md){return(
md`### View:`
)}

function _8(data){return(
data.view()
)}

function _9(md){return(
md`### Filter:`
)}

function _10(data,aq){return(
data
  .filter(d => d.Country == "Argentina")
  .orderby(aq.desc('Alcohol'))
  .select(0,3,4,6,10) 
  .view()
)}

function _11(md){return(
md`### Rename:`
)}

function _12(md){return(
md`I want to rename all columns that start with lowercase`
)}

function _13(data){return(
data
  .rename({
    "infant deaths": "Infant Deaths",
    "percentage expenditure": "Percentage Expenditure",
    "under-five deaths ": "Under-five Deaths",
     " thinness  1-19 years": "Thinness 1-19 years",
    " thinness 5-9 years": "Thinness 5-9 years",
  })
  .view()
)}

function _14(md){return(
md`Now we can see in comparison to the previous table, the columns starting with lowercase have been renamed and now have uppercase`
)}

function _15(md){return(
md`### Group: `
)}

function _16(md){return(
md`I want to se the mean consumption of alcohol in different countries`
)}

function _17(data,op){return(
data
  .groupby("Country")
  .rollup({
    mean_Alc: (d) => op.mean(d.Alcohol),
  })
  .orderby("mean_Alc")
  .view(20)
)}

function _18(md){return(
md`### Order:`
)}

function _19(md){return(
md`Ordering was displayed earlier but I'll repeat it here. <br> I will order the list by descending Polio cases`
)}

function _20(data,aq){return(
data.orderby(aq.desc("Polio")).view(20)
)}

function _21(md){return(
md`### Reducing `
)}

function _22(md){return(
md`Here I will reduce the data so we only see the Country and Measles columns`
)}

function _23(data,aq){return(
data.orderby(aq.desc("Polio")).select("Country", "Measles ").view(20)
)}

function _24(md){return(
md`# Plot.js`
)}

function _25(md){return(
md`### Dot plot:`
)}

function _26(md){return(
md`Import the data with a different variable name`
)}

async function _data_plot(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Life Expectancy Data.csv").text(), d3.autoType)
)}

function _28(Inputs,data_plot){return(
Inputs.table(data_plot)
)}

function _29(data_plot){return(
data_plot.columns
)}

function _30(md){return(
md`You can select a column to be represented in the dot plot, as displayed in your example`
)}

function _select(Inputs,data_plot){return(
Inputs.select(data_plot.columns, {label: "Select one", value: "Alcohol"})
)}

function _32(Plot,data_plot,select){return(
Plot.plot({
  marks: [
    Plot.dot(data_plot, { x: select, r: 10, stroke: select, strokeWidth: 0.1 })
  ],
  color: {
    type: "linear",
    range: ["#4488cc", "#c74b0e"],
    legend: true
  },
  width: 1300,
  height: 150
})
)}

function _33(md){return(
md`### Barcode plot:`
)}

function _34(md){return(
md`The same selector tool is used here, as displayed in your example`
)}

function _35(Plot,data_plot,select){return(
Plot.plot({
  marks: [
    Plot.tickX(data_plot, {
      x: select,
      stroke: select,
      strokeOpacity: 0.6,
      strokeWidth: 0.5
    })
  ],
  color: {
    type: "linear",
    range: ["#4488cc", "#c74b0e"],
    legend: false
  },
  width: 1300,
  height: 200
})
)}

function _36(md){return(
md`### Beeswarm plot`
)}

function _37(Plot,beeswarmX,data_plot,select){return(
Plot.plot({
  y: { axis: null },
  marks: [
    beeswarmX(data_plot, {
      x: select,
      y: () => 0,
      fill: "white",
      stroke: select
    })
  ],
  color: {
    type: "linear",
    range: ["#4488cc", "#c74b0e"],
    legend: true
  },
  height: 400,
  width: 950
})
)}

function _38(md){return(
md`### Histogram:`
)}

function _39(Plot,data_plot,select,data){return(
Plot.plot({
  marks: [
    Plot.rectY(
      data_plot,
      Plot.stackY(
        Plot.binX({ y: "count" }, { x: select, fill: select, thresholds: 10 })
      )
    )
  ],
  color: {
    type: "linear",
    range: ["#4488cc", "#c74b0e"],
    legend: true
  },
  facet: { data, x: "key" },
  height: 400,
  width: 950
})
)}

function _40(md){return(
md`# Visualizations by group`
)}

function _41(md){return(
md`### Boxplot:`
)}

function _42(Plot,data_plot){return(
Plot.plot({
  marks: [
    Plot.boxY(data_plot, { x: "Year", y: "Alcohol", fill: "Year" })
  ],
  color: {
    range: ["#4488cc"],
  },
  y: {
    grid: false,
    label: "Alcohol",
  },
  x: {
    inset: 20,
    label: "Year",
    ticks: 5,
    tickSize: 0
  },
  height: 700,
  width: 1350,
})
)}

function _43(md){return(
md`### Barcode plot:`
)}

function _44(Plot,data_plot){return(
Plot.plot({
  marks: [
    Plot.tickX(data_plot, {
      x: "Alcohol",
      stroke: "Alcohol",
      strokeWidth: 2
    })
  ],
  color: {
    type: "ordinal",
    range: ["#007466", "#c74b0e"],
    width: 300,
    height: 50,
    tickSize: 0,
    fontsize: 18
  },
  y: {
    axis: null,
    pading: 0,
    label: ""
  },
  x: {
    label: 0,
    tickSize: 0,
    ticks: 5
  },
  width: 1300,
  height: 200,
  marginLeft: 150,
  marginRight: 150
})
)}

function _45(md){return(
md`### A sorted view:`
)}

function _sorted(d3,data_plot){return(
d3.sort(data_plot, (d) => -d.Alcohol).map((d) => d.Year)
)}

function _47(Plot,data_plot,d3){return(
Plot.plot({
  marks: [
    Plot.barY(data_plot, { x: "Year", y: "Alcohol", fill: "Year" }),
  ],
  y: {
    grid: false,
    ticks: 5,
    label: "",
    tickSize: 0
  },
  x: {
    axis: null,
    domain: d3.sort(data_plot, (d) => -d["Alcohol"]).map((d) => d.Year),
    padding: 0,
    reverse: true,
    label: "Year"
  },
  color: {
    type: "ordinal",
    range: ["#007466", "#131B26"],
    width: 300,
    height: 50,
    tickSize: 0,
    fontsize: 18
  },
  height: 400,
  padding: 0,
  width: 1300,
  marginLeft: 150,
  marginRight: 150
})
)}

function _48(md){return(
md`# Appendix
`
)}

function _beeswarm(Plot,d3){return(
function beeswarm(
  data,
  { gap = 1, ticks = 50, dynamic, direction, ...options }
) {
  const dots = Plot.dot(data, options);
  const { render } = dots;

  dots.render = function () {
    const g = render.apply(this, arguments);
    const circles = d3.select(g).selectAll("circle");

    const nodes = [];
    const [cx, cy, x, y, forceX, forceY] =
      direction === "x"
        ? ["cx", "cy", "x", "y", d3.forceX, d3.forceY]
        : ["cy", "cx", "y", "x", d3.forceY, d3.forceX];
    for (const c of circles) {
      const node = {
        x: +c.getAttribute(cx),
        y: +c.getAttribute(cy),
        r: +c.getAttribute("r")
      };
      nodes.push(node);
    }
    const force = d3
      .forceSimulation(nodes)
      .force("x", forceX((d) => d[x]).strength(0.8))
      .force("y", forceY((d) => d[y]).strength(0.05))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.r + gap)
          .iterations(3)
      )
      .tick(ticks)
      .stop();
    update();
    if (dynamic) force.on("tick", update).restart();
    return g;

    function update() {
      circles.attr(cx, (_, i) => nodes[i].x).attr(cy, (_, i) => nodes[i].y);
    }
  };

  return dots;
}
)}

function _beeswarmX(beeswarm){return(
function beeswarmX(data, options = {}) {
  return beeswarm(data, { ...options, direction: "x" });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Life Expectancy Data.csv", {url: new URL("./files/8d09b89b8e7b17931837444bbbbad358a4a69cf8ce55cb8a28e6a756e765e60eb231c4f22a7a83df865976eac0bcc48a34d43b060abebc02b5485c1ef0214fd8.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("aq", child1);
  main.import("op", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("data")).define("data", ["aq","FileAttachment"], _data);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["data"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["data","aq"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["data"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["data","op"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["data","aq"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["data","aq"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("data_plot")).define("data_plot", ["d3","FileAttachment"], _data_plot);
  main.variable(observer()).define(["Inputs","data_plot"], _28);
  main.variable(observer()).define(["data_plot"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof select")).define("viewof select", ["Inputs","data_plot"], _select);
  main.variable(observer("select")).define("select", ["Generators", "viewof select"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data_plot","select"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["Plot","data_plot","select"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["Plot","beeswarmX","data_plot","select"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["Plot","data_plot","select","data"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["Plot","data_plot"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["Plot","data_plot"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("sorted")).define("sorted", ["d3","data_plot"], _sorted);
  main.variable(observer()).define(["Plot","data_plot","d3"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("beeswarm")).define("beeswarm", ["Plot","d3"], _beeswarm);
  main.variable(observer("beeswarmX")).define("beeswarmX", ["beeswarm"], _beeswarmX);
  return main;
}
