const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));
const progress = document.getElementById("progress");
const currentScore = document.getElementById("current-score");

let questions = [
    {
        question: "What comes first alphabetically?",
        correctAnswer: "A",
        incorrectAnswers: ["B", "C", "D"],
    },
    {
        question: "What comes first numerically?",
        correctAnswer: "1",
        incorrectAnswers: ["2", "3", "4"],
    },
    {
        question: "What is 2 + 2?",
        correctAnswer: "4",
        incorrectAnswers: ["5", "3", "7"],
    },
];

let availableQuestions = [];
let currentQuestion = [];
let currentAnswers = [];
let score = 0;
let questionCounter = 1;

startGame = () => {
    availableQuestions = [...questions];
    newQuestion();
    checkAnswer();
};

newQuestion = () => {
    let random = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(random, 1)[0];
    question.innerHTML = currentQuestion.question;

    currentAnswers = currentQuestion.incorrectAnswers.concat(
        currentQuestion.correctAnswer
    );
    // Randomise array code obtained here -> https://www.slingacademy.com/article/ways-to-shuffle-an-array-in-javascript/?utm_content=cmp-true
    currentAnswers.sort(() => Math.random() - 0.5);

    let i = 0;
    while (i < choices.length) {
        choices[i].innerHTML = currentAnswers[i];
        i++;
    }
};

checkAnswer = () => {
    choices.forEach((choice) => {
        choice.addEventListener("click", (e) => {
            if (e.target.innerHTML == currentQuestion.correctAnswer) {
                score++;
                currentScore.innerHTML = score;
                if (availableQuestions.length === 0) {
                    return window.location.assign("end.html");
                }
                questionCounter++;
                progress.innerHTML = questionCounter;
                newQuestion();
            } else {
                if (availableQuestions.length === 0) {
                    return window.location.assign("end.html");
                }
                questionCounter++;
                progress.innerHTML = questionCounter;
                newQuestion();
            }
        });
    });
};

startGame();
