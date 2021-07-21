/*****************************************
 ***** Load the data into the table. *****
 ****************************************/

/*let village_pop = new Array();
d3.csv("/tutorials/sampling-distribution-sample-mean/data.csv", data => {
    data.income = (+data.income).toFixed(2);
    village_pop.push(data);
}).then(() => {
    const table = document.querySelector("#table-resident-income");
    const table_head = document.querySelector("#table-resident-income > thead");
    table_head.querySelectorAll("th").forEach(cell => {
        
        cell.style.paddingLeft = '15px';
        cell.style.paddingRight = '15px';
        
        if (cell.textContent == 'Name') cell.style.textAlign = 'left';
        else {
            cell.style.textAlign = 'right';
            cell.style.borderRight = '2px solid white';
        }
     
    })
    
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let tr = document.createElement("tr");
    for (let i = 1; i <= village_pop.length; i++){
        if ( i % 3 === 0){
            tr = document.createElement("tr");
            tbody.appendChild(tr);

            if ( i === 27){
                tbody = document.createElement("tbody");
                tr = document.createElement("tr");
                tr.setAttribute("class", "row-button");
                td = document.createElement("td");
                td.setAttribute("colspan", "8");
                btn = document.createElement("button");
                btn.textContent = "Show More"

                table.appendChild(tbody.appendChild(tr.appendChild(td.appendChild(btn))))
                tbody = document.createElement("tbody");
            }
        }
        td_name = document.createElement("td");
        td_name.textContent = village_pop[i-1].name;
        td_name.style.textAlign="left";
        td_income = document.createElement("td");
        td_income.textContent = village_pop[i-1].income;
        td_income.style.textAlign="right";
        tr.appendChild(td_name);
        tr.appendChild(td_income);        
    }
});
*/