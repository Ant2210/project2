const saveButton = document.getElementById("save-btn");
const launchValidationModal = document.getElementById(
    "launch-validation-modal"
);
const launchCountdown = document.getElementById("launch-countdown-modal");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const finalScore = document.getElementById("final-score");
finalScore.innerHTML = mostRecentScore;

const finalScoreEmoji = document.getElementsByClassName("final-score-emoji");
Array.from(finalScoreEmoji).forEach((emoji) => {
    parseInt(mostRecentScore) === 0
        ? (emoji.innerHTML = "&#128557")
        : (emoji.innerHTML = "&#127941");
});

saveScore = () => {
    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Check the value of an input field found here -> https://stackoverflow.com/questions/3937513/javascript-validation-for-empty-input-field
        const userInput = document.forms["score-form"]["username"].value;
        if (userInput == null || userInput == "") {
            launchValidationModal.click();
        } else {
            const score = {
                score: Math.floor(Math.random() * 100),
                name: userInput,
            };

            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score);

            localStorage.setItem("highScores", JSON.stringify(highScores));
            redirectToGame();
        }
    });
};

redirectToGame = () => {
    let timeLeft = 10;
    launchCountdown.click();
    let downloadTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("countdown-timer").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            return window.location.assign("index.html");
        }
    }, 1000);
};

saveScore();
