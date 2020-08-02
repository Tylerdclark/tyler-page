
/*jshint esversion: 6 */
const flip = () => {
    document.getElementById("card").className = "card flipped";
};
const unflip = () => {
    document.getElementById("card").className = "card";
};
//Start or Stop the animation
const stopButtonElement = document.getElementById("stop-btn");
stopButtonElement.addEventListener("click",  () => {
    stopButtonElement.style.backgroundColor = started ? "green" : "red";
    stopButtonElement.style.borderBottomColor = started
        ? "darkgreen"
        : "darkred";
    started = !started;
});
