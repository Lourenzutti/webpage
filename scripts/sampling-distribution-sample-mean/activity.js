const svgNS = "http://www.w3.org/2000/svg";
var width = +document.querySelector("#histogrm").clientWidth
var height = +document.querySelector("#histogrm").clientHeight
hist = (container, data, nbins) => {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 20, left: 40 },
        width = 600 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select('#' + container.id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([d3.min(data, function (d) { return +d.value - 100 }), d3.max(data, function (d) { return +d.value + 100 })]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(d => { return d.value; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nbins)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
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
        .style("fill", "steelblue")

};

students = [];
table = document.getElementById("pop-table");
create_header = (table) => {
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell_name = row.insertCell(0);
    var cell_income = row.insertCell(1);
    cell_name.innerHTML = "<b>Name</b>";
    cell_income.innerHTML = "<b>Income</b>";
};

create_header(table);
d3.csv("https://raw.githubusercontent.com/Lourenzutti/lourenzutti.github.io/master/tutorials/sampling_distribution/data.csv",
    (error, data) => {
        d3.select('#pop-table')
            .selectAll("tr")
            .data(data)
            .enter()
            .append('tr')
            .text(d => {
                var row = table.insertRow();
                var cell_name = row.insertCell(0);
                var cell_income = row.insertCell(1);
                cell_name.innerHTML = d.name;
                cell_income.innerHTML = (+d.income).toFixed(2);
                students.push({ name: d.name, value: +(+d.income).toFixed(2) });
            });
        hist(document.querySelector('#histogrm'), students, nbins = 25);
    }).get();

generate_sample_button = document.querySelector("#generate-sample-button");
width = width / 2;
height = 180;
var mean;
generate_sample_button.onclick = () => {
    const div_samples = document.querySelector('#div-samples');
    div_samples.innerHTML = ''
    nsamples = +document.querySelector("#number-samples").value;
    if (nsamples > 200) {
        nsamples = 200;
        document.querySelector("#number-samples").value = 200;
    };
    
    n = +document.querySelector("#sample-size").value;
    if (n > 200) {
        n = 200;
        document.querySelector("#sample-size").value = 200;
    };
    
    var div;
    var h5;
    var h6;
    var svg_sample;
    var table_sample;
    var row;
    var cell_name;
    var cell_income;
    mean = new Array(nsamples);
    var sample = new Array(nsamples);
    for (var i = 0; i < nsamples; i++) {
        sample[i] = []

        if (i < 5) {
            div = document.createElement('div');
            div.setAttribute('id', `div-sample-${i}`);
            div.setAttribute('class', `multi-column`);
            div_samples.appendChild(div);
            div_sample = document.createElement('div');
            div_sample.setAttribute('id', `sample-${i}`);
            div_sample.setAttribute('style', 'height: 250px; width: 50%; overflow-y: scroll;');
            div_sample.setAttribute('class', `column`);
            table_sample = document.createElement('TABLE');
            create_header(table_sample);
            div_sample.appendChild(table_sample);
        };

        mean[i] = { 'value': 0 };
        for (var j = 0; j < n; j++) {
            idx = Math.floor(Math.random() * students.length)
            sample[i].push({
                name: students[idx].name,
                value: students[idx].value
            });
            mean[i].value += +students[idx].value;

            if (j < 50) {
                row = table_sample.insertRow();
                cell_name = row.insertCell(0);
                cell_income = row.insertCell(1);
                cell_name.innerHTML = students[idx].name;
                cell_income.innerHTML = students[idx].value;
            };
        }

        mean[i].value = mean[i].value / n;
        if (i < 5) {
            h5 = document.createElement('h4');
            h5.appendChild(document.createTextNode(`Sample ${i + 1} (first 50 elements) -- sample mean: ${mean[i].value.toFixed(2)}`));
            div.appendChild(h5);
            div.appendChild(div_sample);

            div_hist = document.createElement('div');
            div_hist.setAttribute('style', 'height: 250px; width: 50%;')
            div_hist.setAttribute('class', `column`);
            div_hist.setAttribute('id', `hist-sample-${i}`)
            div.appendChild(div_hist);

            hist(document.querySelector(`#hist-sample-${i}`), sample[i], nbins = 10);


            div_samples.appendChild(document.createElement('br'));
        }
    }
    sampling_dist = document.querySelector('#div-sampling-dist');
    sampling_dist.innerHTML = '';
    h7 = document.createElement('h4');
    h7.textContent = `Sampling distribution of the Mean: mean = ${(mean.reduce(
        (total, num) => total + num.value, 0) / nsamples).toFixed(2)}`;
    sampling_dist.appendChild(h7)
    sampling_dist.appendChild(document.createElement('br'))

    hist(document.querySelector('#div-sampling-dist'), mean, nbins = 25);
}