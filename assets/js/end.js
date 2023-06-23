const saveButton = document.getElementById("save-btn");

saveScore = () => {
    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("you clicked");
    });
};

saveScore()
