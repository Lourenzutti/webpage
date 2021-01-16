const exercises = document.querySelectorAll(".box-exercise");

exercises.forEach(exercise => {
    const btn = exercise.querySelector(".btn-show-answers");
    const answers = exercise.querySelectorAll(".answer");
    const solution = exercise.querySelector(".solution");

    btn.addEventListener("click", () => {
        for (answer of answers) {
            if (answer.value === "") {
                alert("You should try answering the exercises before seeing the answers.");
                return 0;
            }
        }

        if (solution.style.display === "") {
            solution.style.display = "block";
            btn.textContent = "Hide answers";
        }
        else {
            solution.style.display = "";
            btn.textContent = "Show answers";
        }
    });

});

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