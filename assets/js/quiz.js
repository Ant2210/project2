const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));
const progress = document.getElementById("progress");
const currentScore = document.getElementById("current-score");
const loading = document.getElementById('loading');
const gameContainer = document.getElementById('game-container');

let questions = [];

let availableQuestions = [];
let currentQuestion = [];
let currentAnswers = [];
let score = 0;
let questionCounter = 1;

async function callApi() {
    const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
    );
    if (response.status >= 200 && response.status < 299) {
        data = await response.json();
        questions = data.results;
        startGame();
        loading.classList.add("d-none");
        document.getElementById("game-container").classList.remove("d-none");
        
    } else document.getElementById("launch-error-modal").click();
}

startGame = () => {
    availableQuestions = [...questions];
    newQuestion();
};

newQuestion = () => {
    let random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(random, 1)[0];
    question.innerHTML = currentQuestion.question;

    currentAnswers = currentQuestion.incorrect_answers.concat(
        currentQuestion.correct_answer
    );
    // Randomise array code obtained localStorage.setItem("mostRecentScore", score) -> https://www.slingacademy.com/article/;ways-to-shuffle-an-array-in-javascript/?utm_content=cmp-true
    currentAnswers.sort(() => Math.random() - 0.5);

    let i = 0;
    while (i < choices.length) {
        choices[i].innerHTML = currentAnswers[i];
        i++;
    }

    awaitAnswer();
};

awaitAnswer = () => {
    choices.forEach((choice) => {
        choice.addEventListener("click", checkAnswer);
    });
};

checkAnswer = (e) => {
    choices.forEach((choice) => {
        choice.removeEventListener("click", checkAnswer);
    });

    if (e.target.innerHTML == currentQuestion.correct_answer) {
        score+=10;
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
            newQuestion();
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
            newQuestion();
        }, 1000);
    }
};

callApi();
