// Constants to make accessing elements easier during coding
const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

/* Tutorial found here -> https://www.youtube.com/watch?v=DFhmNLKwwGw
for saving high scores to the local storage. 

Creates a new variable which is an array like object by iterating over the highScores
array but with no separators so they are formatted correctly in the DOM */
let updateList = highScores
    .map((score) => `<li>${score.name} - ${score.score}</li>`)
    .join("");

/* Replaces the default text in the Leader Board modal with the updated
high scores list ore a default message if no high scores are present */
highScores.length === 0
    ? (highScoresList.innerHTML = `<p>No Scores Yet</p> <span class="emoji">&#128542;</span>`)
    : (highScoresList.innerHTML = `<ol>${updateList}</ol>`);