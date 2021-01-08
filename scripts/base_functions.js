
create_exercise = (exercise_name) => {
    /**
     * Add EventListener for the answer button of the exercise. 
     * Before showing the answers, it checks if the textboxes are filled.
     * All the textarea tags for the answer of the exercises must have name the name `exercise_name` below.
     * Something like Exercise-2-1.
     * The button to show the answer must have id "btn-exercise_name", e.g., "btn-Exercise-2-1".
     * 
     * @param {string} [exercise_name] - the name of the exercise, e.g., Exercise-2-1
     */
    document.getElementById("btn-" + exercise_name).addEventListener("click", () => {
        let btn = document.getElementById("btn-" + exercise_name);
        let div = document.getElementById("answer-" + exercise_name);

        let flag = false;

        document.querySelectorAll("." + exercise_name).forEach(
            textbox => {
                if (textbox.value == "")
                    flag = true
            });

        if (div.style.display == "block") {
            btn.innerHTML = "Show answers";
            div.style.display = "none";
        }
        else {
            if (flag) {
                alert("You should try answering the exercises before seeing the answers.")
                return 0;
            }
            btn.innerHTML = "Hide answer";
            div.style.display = "block";
        }
    });
};