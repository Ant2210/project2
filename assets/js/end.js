// Constants to make accessing elements easier during coding
const saveButton = document.getElementById("save-btn");
const launchCountdown = new bootstrap.Modal(document.getElementById("countdownModal"));
const launchValidation = new bootstrap.Modal(document.getElementById("validationModal"));

const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const finalScore = document.getElementById("final-score");

// Sets the final score in the DOM to the most recent score
finalScore.innerHTML = mostRecentScore;

/* Function that inserts a crying emoji if the user scores 0 or a
medal emoji if the score is more than 0.
*/
const finalScoreEmoji = document.getElementsByClassName("final-score-emoji");
Array.from(finalScoreEmoji).forEach((emoji) => {
    parseInt(mostRecentScore) === 0 ? (emoji.innerHTML = "&#128557;") : (emoji.innerHTML = "&#127941;");
});

/* Tutorial found here -> https://www.youtube.com/watch?v=DFhmNLKwwGw
for saving high scores to the local storage.

Advice found here for checking the value of an input field -> https://stackoverflow.com/questions/3937513/javascript-validation-for-empty-input-field

Function that disables the default function of a button, ensures the input
field hasn't been left blank. If a valid name is input this then saves the score
and username as an object, add it to the highscores array, and reorders from 
highest to lowest and converts it to a string for storage in the local storage.

Then calls the redirectToGame function. */
const saveScore = () => {
    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        const userInput = document.forms["score-form"]["username"].value;
        if (userInput == null || userInput == "") {
            launchValidation.show();
        } else {
            const score = {
                score: mostRecentScore,
                name: userInput,
            };

            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score);

            localStorage.setItem("highScores", JSON.stringify(highScores));
            redirectToGame();
        }
    });
};

/* Launches a modal to confirm submission of a new high score then 
redirects the user to the homepage where they can check their score
in leader board. */
const redirectToGame = () => {
    let timeLeft = 10;
    launchCountdown.show();
    setInterval(() => {
        timeLeft--;
        document.getElementById("countdown-timer").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            return window.location.assign("index.html");
        }
    }, 1000);
};

// Calls the save score function
saveScore();
