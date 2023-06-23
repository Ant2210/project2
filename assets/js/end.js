const saveButton = document.getElementById("save-btn");
const launchValidationModal = document.getElementById("launch-validation-modal");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("final-score");
finalScore.innerHTML = mostRecentScore;

const finalScoreEmoji = document.getElementsByClassName("final-score-emoji");
Array.from(finalScoreEmoji).forEach((emoji) => {
    (parseInt(mostRecentScore) === 0) ? emoji.innerHTML = "&#128557" : emoji.innerHTML = "&#127941";
});

saveScore = () => {
    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Check the value of an input field found here -> https://stackoverflow.com/questions/3937513/javascript-validation-for-empty-input-field
        const userInput = document.forms["score-form"]["username"].value;
        if(userInput == null || userInput == "") {
            launchValidationModal.click();
        } else {
            alert('Thanks')
        }
    });
};

saveScore()
