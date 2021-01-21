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
    height = 250 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("main")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

bins = d3.bin().thresholds(20)(sample_means);

x = d3.scaleLinear()
    .domain([bins[0].x0 - 1, bins[bins.length - 1].x1 + 5])
    .range([margin.left, width - margin.right]);

y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) + 10]).nice()
    .range([height - margin.bottom, margin.top]);

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "bottom")
        .attr("dy", "2em")
        .text("Weekly hours"));

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr('dy', '-1.3em')
        .attr('dx', '-1.5em')
        .text("Frequency"));
/*yAxis = d3.axisLeft(y);*/
svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("y", d => y(d.length))
    .attr("height", d => y(0) - y(d.length));

svg.append("g")
    .call(xAxis);

svg.append("g")
    .call(yAxis);