// Constants to make accessing elements easier during coding
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));
const progress = document.getElementById("progress");
const currentScore = document.getElementById("current-score");
const loading = document.getElementById("loading");
const gameContainer = document.getElementById("game-container");
const difficultyContainer = document.getElementById('difficulty-container');
const quit = document.getElementById("quit-btn");
const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
const quitModal = new bootstrap.Modal(document.getElementById("quitModal"));

// Variables to hold questions, answers score and difficulty
let questions = [];

let availableQuestions = [];
let currentQuestion = [];
let currentAnswers = [];
let score = 0;
let scoreToAdd = 10;
let questionCounter = 1;
let difficulty = "";

/* Function that listens for which difficulty level is selected,
then sets the difficulty variable, hides the difficulty container,
hides the quit button (for aesthetics), then shows the loading
text (again for aesthetics) before calling the API function. */
const getDifficulty = () => {
    difficultyContainer.addEventListener("click", (e) => {
        switch (e.target.innerHTML) {
            case "Easy":
                difficulty = "easy";
                difficultyContainer.classList.add("d-none");
                quit.classList.add("d-none");
                loading.classList.remove("d-none");
                callApi();
                break;
            case "Medium":
                difficulty = "medium";
                scoreToAdd = 15;
                difficultyContainer.classList.add("d-none");
                quit.classList.add("d-none");
                loading.classList.remove("d-none");
                callApi();
                break;
            case "Hard":
                difficulty = "hard";
                scoreToAdd = 20;
                difficultyContainer.classList.add("d-none");
                quit.classList.add("d-none");
                loading.classList.remove("d-none");
                callApi();
                break;
        }
    });
};

/* Function that attempts to call the data from the external API to retrieve 
questions matching the difficulty level set by the get difficulty function.

If the data is retrieved it saves the questions retrieved to the questions
variable then creates a shallow copy of the questions in availableQuestions
which can then have methods applied to it without effecting the original data. 

It then calls the loadQuestion function, hides the loading text, and displays the
game container and quit button. 

If there is any issue retrieving the data an error is logged and the user is informed
via a modal */
async function callApi() {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=15&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        questions = data.results;
        availableQuestions = [...questions];

        loadQuestion();
        loading.classList.add("d-none");
        gameContainer.classList.remove("d-none");
        quit.classList.remove("d-none");
    } catch (error) {
        console.log(error);
        errorModal.show();
    }
}

/* Function that selects a random question from the availableQuestions array,
then removes it from the array so it can't be selected as a future question
and displays the question within the game container. 

The currentAnswers array is then created using the correct answer and 3
incorrect answers. These are then randomised and displayed within the 
choices boxes within the game container and calls the awaitAnswer function.

Randomise array code obtained here -> https://www.slingacademy.com/article/;ways-to-shuffle-an-array-in-javascript/?utm_content=cmp-true */
const loadQuestion = () => {
    let random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(random, 1)[0];
    question.innerHTML = currentQuestion.question;

    currentAnswers = currentQuestion.incorrect_answers.concat(
        currentQuestion.correct_answer
    );

    currentAnswers.sort(() => Math.random() - 0.5);

    let i = 0;
    while (i < choices.length) {
        choices[i].innerHTML = currentAnswers[i];
        i++;
    }

    awaitAnswer();
};

/* Function that listens for a click on each of the choice boxes and
then calls the checkAnswer function. */
const awaitAnswer = () => {
    choices.forEach((choice) => {
        choice.addEventListener("click", checkAnswer);
    });
};

/* Function that checks if the inner HTML/text of the chosen answer
matches the correct answer stored in the currentQuestion array.

It will indicate if the answer is correct or incorrect by changing
the box colour to green or red one second, increase the score if 
correct and increase the progress counter in the HUD then loads the
next question.

If there are no more questions to be loaded the current score is logged
in local storage and the user is redirected to the end page. */
const checkAnswer = (e) => {
    choices.forEach((choice) => {
        choice.removeEventListener("click", checkAnswer);
    });

    if (e.target.innerHTML == currentQuestion.correct_answer) {
        score += scoreToAdd;
        currentScore.innerHTML = score;
        e.target.classList.add("correct");

        setTimeout(() => {
            e.target.classList.remove("correct");
            if (availableQuestions.length === 0) {
                localStorage.setItem("mostRecentScore", score);
                return window.location.assign("end.html");
            }
            questionCounter++;
            progress.innerHTML = questionCounter;
            loadQuestion();
        }, 1000);
    } else {
        e.target.classList.add("incorrect");

        setTimeout(() => {
            e.target.classList.remove("incorrect");
            if (availableQuestions.length === 0) {
                localStorage.setItem("mostRecentScore", score);
                return window.location.assign("end.html");
            }
            questionCounter++;
            progress.innerHTML = questionCounter;
            loadQuestion();
        }, 1000);
    }
};

// Event listener for the quit button to launch the quit modal
quit.addEventListener("click", () => {
    quitModal.show();
});

// Calls the getDifficulty function to start the game
getDifficulty();
