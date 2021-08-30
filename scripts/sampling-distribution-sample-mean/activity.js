/* Javascript the sampling distribution activity.
/* Date: 20201-08-26
/* Author: Rodolfo Lourenzutti*/

get_data_from_table = (table_name) =>{ 
	table = document.getElementById(table_name);
	let data = Array(table.querySelectorAll("tr").length);
	entries_pop = table.querySelectorAll("td")
	cont = 0
	entries_pop.forEach(
		(entry) => {
			value = parseFloat(entry.textContent);
			if (!isNaN(value)) {
				data[cont++] = parseFloat(entry.textContent);
				entry.value = value;
			}
		}
	);
	return data;
}

/****************************************
*** Creates the Population Distribution
*** for the Activity
*****************************************/

income = get_data_from_table( "table-resident-income");

let activity_pop_dist = d3.select("#pop-dist-activity")
	.attr("width", width)
	.attr("height", height + margin.top + margin.bottom + 30)
	.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

/*** creates the bin with thresholds */
bins = d3.bin()
    .thresholds(50)(income);

/*** creates the x and y-axes scales */
x = d3.scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([margin.left, width - margin.right]);

y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) + 10]).nice()
    .range([height - margin.bottom, margin.top]);

/*** creates the Axes */	
xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width / 2)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "bottom")
        .attr('font-size', '100px')
        .attr("class", "axis")
        .attr("dy", "3.5em")
        .text("Income")
		.attr("class","axes-label"));
		
	

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 70))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -145 )
        .attr("y", -50)
        .attr("font-weight", "bold")
        .attr('transform', 'rotate(270)')
        .attr("text-anchor", "middle")
        .text("Frequency")
		.attr("class","axes-label"));

/*** appending the bars to the element */		
activity_pop_dist.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("y", d => y(d.length))
    .attr("height", d => y(0) - y(d.length))
    .attr("class", 'bin');

/*** appending the axes to the element */		
activity_pop_dist.append("g").call(xAxis);
activity_pop_dist.append("g").call(yAxis);


activity_pop_dist.append("text")
.attr("x", width / 2)
.attr("y", 50)
.attr("text-anchor", "middle")
.text("Population Distribution of Income")
.attr("dy", "-15px")
.attr("class", "plot-title");

activity_pop_dist.selectAll("text").attr("font-size","14px");
d3.selectAll(".axes-label").attr("font-size","16px");








	
	
	