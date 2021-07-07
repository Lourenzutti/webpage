/******************************
******** Page Loader  *********
******************************/

// load the page with the back button
window.onpopstate = (event) => {
    load_page(event.state.page);
}

/**
 * Make the request for the page and 
 * update the current html document.
 * @param  {string} path the desired file
 */
function load_page(path) {
    const page = path.split("#")[0];

    fetch(page)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            return response.statusText;
        })
        .then(text => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, "text/html");
            document.querySelector('main').innerHTML = html.querySelector("main")?.innerHTML ? html.querySelector("main")?.innerHTML : text;
        });
}

// add event listener to load the pages.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.onclick = (event) => {
            load_page(link.dataset.page);
            history.pushState({ page: link.dataset.page }, "", link.dataset.page)
            return false;
        };
    });
});






/******************************
**** Exercises' controller ****
******************************/
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


