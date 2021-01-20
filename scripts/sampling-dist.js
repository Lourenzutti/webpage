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
height = 200;
width = 400;
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);



/* COllecting the data from the table */
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
)