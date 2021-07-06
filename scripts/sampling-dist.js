/* Javascript with code specific for the sampling distribution chapter.
/* Author: Rodolfo Lourenzutti

/**********************************/
/* Controls the collapsible table */
/**********************************/

btn = document.querySelector(".row-button button")
btn.onclick = (e) => {
    tbodies = document.querySelectorAll(".collapsible");
    table = tbodies[0].parentElement;
    tbodies[0].style.display = "table-row-group"; // set the visibility of the first hidden part of the table.
    e.target.parentElement.parentElement.parentElement.remove(); // removes the tbody that contains the first button

    tbody_level2 = e.target.parentElement.parentElement.parentElement.cloneNode(true); 
    table.appendChild(tbody_level2); //attach the tbody with the level 2 button
    btn_level2 = tbody_level2.querySelector("button");
    btn_level2.textContent = "Show all"; // update the text of the level 2 button
    
    // assign a new event handler for the level 2 button
    btn_level2.onclick = (e2) => {  
        tbodies[1].style.display = "table-row-group";
        e2.target.parentElement.parentElement.parentElement.remove();
        tbody_level3 = e2.target.parentElement.parentElement.parentElement.cloneNode(true);
        table.appendChild(tbody_level3);
        btn_level3 = tbody_level3.querySelector("button");
        btn_level3.textContent = "Collapse";
        
        // assign a new event handler for the level 3 button
        btn_level3.onclick = (e3) => {
            tbodies[0].style.display = ""; // resets the display of the first part of the table.
            tbodies[1].style.display = ""; 
            table.appendChild(e.target.parentElement.parentElement.parentElement);
            e3.target.parentElement.parentElement.parentElement.remove(); // removes button level 3
        }
    }
}


/**********************************/
/****  Creates the histogram   ****/
/**********************************/

/* Collecting the data from the table */
table = document.getElementById("all-samples-restaurant");
sample_means = Array(1140);
entries = table.querySelectorAll("td")
cont = 0
entries.forEach(
    (entry) => {
        value = parseFloat(entry.textContent);
        if (!isNaN(value)) {
            sample_means[cont++] = parseFloat(entry.textContent);
            entry.value = value;
        }
    }
);

const ex_svg = document.getElementById("example-3-1-sampl-dist")
    .parentElement;

// set the dimensions and margins of the graph
let margin = { top: 35, right: 30, bottom: 25, left: 40 },
    height = 300,
    width = ex_svg.clientWidth - parseInt(window.getComputedStyle(ex_svg).paddingRight);

// append the svg object to the body of the page
svg = d3.select("#example-3-1-sampl-dist")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// creates the bin with thresholds of 20
bins = d3.bin()
    .thresholds(20)(sample_means);

// creates the scale of x-axis
x = d3.scaleLinear()
    .domain([bins[0].x0 - 1, bins[bins.length - 1].x1 + 5])
    .range([margin.left, width - margin.right]);

    // creates the scale of x-axis
y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) + 10]).nice()
    .range([height - margin.bottom, margin.top]);


xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width / 2)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "bottom")
        .attr("class", "axis")
        .attr("dy", "3.5em")
        .text("Average Weekly Hours"));

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -100)
        .attr("y", -50)
        .attr("font-weight", "bold")
        .attr('transform', 'rotate(270)')
        .attr("text-anchor", "middle")
        .text("Frequency"));

svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("y", d => y(d.length))
    .attr("height", d => y(0) - y(d.length))
    .on("mouseenter", (d, i, nodes) => { // Mouse-over event: turns the bin red and add the number of data points in the bin to the top of the bin
        d3.select(d.target).attr("fill", "red");
        d3.select(d.target.parentNode)
            .append("text")
            .attr("x", (x(i.x0) + x(i.x1)) / 2)
            .attr("text-anchor", "middle")
            .attr("y", y(i.length + 3))
            .attr("class", "freq")
            .text(i.length)
            .property("bar", d.target);
        
        d3.select(d.target).style("cursor", "pointer"); // change the cursor
        entries.forEach(entry => {
            if (entry.value >= x.invert(d.target.x.baseVal.value) &&
                entry.value <= x.invert(d.target.x.baseVal.value + d.target.width.baseVal.value)){
                entry.style.color = 'red';
            }
        });
    })
    .on("mouseout", (d, i, nodes) => { // Mouse-out event: returns to the original configuration
        if (!d.target.flag) {
            d3.select(d.target).attr("fill", "steelblue")
            d3.selectAll(".freq")
                .filter((e, j, texts) => {
                    return texts[j].bar === d.target;
                }).remove();
            d3.select(d.target).style("cursor", "default");

            entries.forEach(entry => {
                if (entry.value >= x.invert(d.target.x.baseVal.value) &&
                    entry.value <= x.invert(d.target.x.baseVal.value + d.target.width.baseVal.value)){
                    entry.style.color = '';
                }
            });
        }
    })
    .on("click", (d, i, nodes) => { // click event: lock/unlock the mouse over changes.
        d.target.flag = !d.target.flag;
        if (d.target.flag) {
            d3.select(d.target).attr("fill", "red");
            svg.dispatch("mouseenter");
        }
        else {
            d3.select(d.target).attr("fill", "steelblue");
        }
    });

// Title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text("Histogram of average weekly hours for all samples of size 3")
    .attr("dy", "-15px")
    .attr("class", "plot-title");

// Subtitle
svg.append("text")
    .text("Population Mean: 43.45")
    .attr("x", 60)
    .attr("y", 0)
    .attr("text-anchor", "start")
    .attr("dy", "6px")
    .attr("class", "plot-subtitle");

// Button to Show/Hide Mean
let g = svg.append("g")
    .on("mouseover", function (d) {
        d3.select(this).style("cursor", "pointer"); // change the cursor
    })
    .on("mouseout", function (d) {
        d3.select(this).style("cursor", "default");
    })
    .on("click", (d, i, e) => {
        d.target.parentElement.clicked = !d.target.parentElement.clicked;
        g_element = d3.select(d.target.parentElement);
        if (d.target.parentElement.clicked) {
            g_element.select("rect")
                .attr("fill", "#c45149");
            g_element.select('text')
                .text('Hide true mean');

            g_element
                .append('line')
                .style("stroke", "black")
                .style("stroke-width", 3)
                .attr("x1", d => x(43.45))
                .attr("y1", d => y(0))
                .attr("x2", d => x(43.45))
                .attr("y2", d => y(200));
        }
        else {
            g_element.select("rect")
                .attr("fill", "gray");
            g_element.select('text')
                .text('Show true mean');

            g_element.select("line").remove()
        }
    });

// Creates the rectangle of the button
g.append("rect")
    .attr("x", 60)
    .attr("y", 30)
    .attr("width", 108)
    .attr("height", 30)
    .attr("fill", "gray");

// Add text to the button
g.append("text")
    .text("Show true mean")
    .attr("x", 65)
    .attr("y", 50)
    .attr("text-anchor", "start")
    .style("font-size", '15px')
    .attr("fill", "white");

svg.append("g")
    .call(xAxis);

svg.append("g")
    .call(yAxis);

d3.selectAll("text")
    .attr('font-size', '13px');


/**
 * Check the reader selected the right bars in the histogram:
 */
var check_button = document.getElementById("check-item-1");
check_button.onclick = 
    d => {
        
    }