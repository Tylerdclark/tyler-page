function flip() { document.getElementById('card').className = 'card flipped'; }
function unflip() { document.getElementById('card').className = 'card'; }
//Start or Stop the animation
const stopButtonElement = document.getElementById("stop-btn")
stopButtonElement.addEventListener("click", function () {
  stopButtonElement.style.backgroundColor = (started) ? "green" : "red";
  stopButtonElement.style.borderBottomColor = (started) ? "darkgreen" :"darkred"
  started = !started;

})
