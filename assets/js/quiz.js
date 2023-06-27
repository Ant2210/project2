const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));
const progress = document.getElementById("progress");
const currentScore = document.getElementById("current-score");
const loading = document.getElementById("loading");
const gameContainer = document.getElementById("game-container");
const difficultyContainer = document.getElementById('difficulty-container');
const quit = document.getElementById("quit-btn");

let questions = [];

let availableQuestions = [];
let currentQuestion = [];
let currentAnswers = [];
let score = 0;
let scoreToAdd = 10;
let questionCounter = 1;
let difficulty = "";

const getDifficulty = () => {
    difficultyContainer.addEventListener("click", (e) => {
        switch(e.target.innerHTML) {
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
}

async function callApi() {
    const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=15&difficulty=${difficulty}&type=multiple`
    );
    if (response.status >= 200 && response.status < 299) {
        data = await response.json();
        questions = data.results;
        availableQuestions = [...questions];

        loadQuestion();
        loading.classList.add("d-none");
        gameContainer.classList.remove("d-none");
        quit.classList.remove("d-none");
    } else document.getElementById("launch-error-modal").click();
}

const loadQuestion = () => {
    let random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(random, 1)[0];
    question.innerHTML = currentQuestion.question;

    currentAnswers = currentQuestion.incorrect_answers.concat(
        currentQuestion.correct_answer
    );
    // Randomise array code obtained here -> https://www.slingacademy.com/article/;ways-to-shuffle-an-array-in-javascript/?utm_content=cmp-true
    currentAnswers.sort(() => Math.random() - 0.5);

    let i = 0;
    while (i < choices.length) {
        choices[i].innerHTML = currentAnswers[i];
        i++;
    }

    awaitAnswer();
};

const awaitAnswer = () => {
    choices.forEach((choice) => {
        choice.addEventListener("click", checkAnswer);
    });
};

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

quit.addEventListener("click", () => {
    document.getElementById("launch-quit-modal").click();
});

getDifficulty();
