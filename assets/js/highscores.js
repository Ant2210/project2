// Constants to make accessing elements easier during coding
const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores"));

/* Tutorial found here -> https://www.youtube.com/watch?v=DFhmNLKwwGw
for saving high scores to the local storage. 

Function retrieves the high scores from local storage and converts
back to an array, which then can be iterated over and displayed
on the DOM as a list item. */
highScoresList.innerHTML = highScores
    .map((score) => {
        return `<li>${score.name} - ${score.score}</li>`;
    })
    .join("");
