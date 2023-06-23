const saveButton = document.getElementById("save-btn");
const launchValidationModal = document.getElementById("launch-validation-modal");

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
