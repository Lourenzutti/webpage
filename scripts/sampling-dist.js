/**********************************/
/* Controls the collapsible table */
/**********************************/

btn = document.querySelector(".row-button button")
btn.onclick = (e) => {
    tbodies = document.querySelectorAll(".collapsible");
    table = tbodies[0].parentElement;
    tbodies[0].style.display = "table-row-group";
    e.target.parentElement.parentElement.parentElement.remove();

    tbody_level2 = e.target.parentElement.parentElement.parentElement.cloneNode(true);
    table.appendChild(tbody_level2);
    btn_level2 = tbody_level2.querySelector("button");
    btn_level2.textContent = "Show all";
    btn_level2.onclick = (e2) => {
        tbodies[1].style.display = "table-row-group";
        e2.target.parentElement.parentElement.parentElement.remove();
        tbody_level3 = e2.target.parentElement.parentElement.parentElement.cloneNode(true);
        table.appendChild(tbody_level3);
        btn_level3 = tbody_level3.querySelector("button");
        btn_level3.textContent = "Collapse";
        btn_level3.onclick = (e3) => {
            tbodies[0].style.display = "";
            tbodies[1].style.display = "";
            table.appendChild(e.target.parentElement.parentElement.parentElement);
            e3.target.parentElement.parentElement.parentElement.remove();
        }
    }
}

/**********************************/
/****  Creates the histogram   ****/
/**********************************/

/* Collecting the data from the table */
table = document.querySelectorAll("table")[1];
sample_means = Array(1140);
entries = table.querySelectorAll("td")
cont = 0
entries.forEach(
    (entry) => {
        value = parseFloat(entry.textContent);
        if (!isNaN(value)) {
            sample_means[cont++] = parseFloat(entry.textContent);
        }
    }
);

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("main")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// X axis: scale and draw:
var x = d3.scaleLinear()
    .domain([0, 90])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, 400]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// set the parameters for the histogram
var histogram = d3.bin(sample_means)
    .value(d => d)
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(20)); // then the numbers of bins

// And apply this function to data to get the bins
const bins = histogram(sample_means);

// Y axis: scale and draw:
var y = d3.scaleLinear()
    .range([height, 0]);
y.domain([0, d3.max(bins, d => d.length)]);   // d3.hist has to be called before the Y axis obviously
svg.append("g")
    .call(d3.axisLeft(y));

// append the bar rectangles to the svg element
svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
    .attr("height", function (d) { return height - y(d.length); })
    .style("fill", "#69b3a2")

