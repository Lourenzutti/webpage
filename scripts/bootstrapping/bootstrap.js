/**
 * The fish weights
 */

const fish_weights = [43, 44, 26, 42, 46, 41, 47, 36,
    47, 40, 37, 36, 59, 43, 42, 61, 24, 58, 60, 37]

let take_sample_btn = document.getElementById("take-fish-sample");
take_sample_btn.addEventListener("click",
    (e) => {
        const weights = sample(fish_weights, size=10);
        console.log(weights);
    }

)
