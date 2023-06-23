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

startGame = () => {
    newQuestion();
    checkAnswer();
}

newQuestion = () => {
    availableQuestions = [...questions];
    let random = Math.floor(Math.random() * 3);
    currentQuestion = availableQuestions.splice(random, 1);
    question.innerHTML = currentQuestion[0].question;

    currentAnswers = currentQuestion[0].incorrectAnswers.concat(
        currentQuestion[0].correctAnswer
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
            if(e.target.innerHTML == currentQuestion[0].correctAnswer) {
                score++;
                currentScore.innerHTML = score;
                newQuestion();
            }
        })
    })
}

startGame();