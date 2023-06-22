const question = document.getElementById('question');
const choices = document.getElementsByClassName('choices');
const progress = document.getElementById('progress');
const currentScore = document.getElementById('current-score');

let questions = [
    {
       question: "What comes first alphabetically?",
       correctAnswer: "A",
       incorrectAnswers: ["B", "C", "D"]
    }, 
    {
        question: "What comes first numerically?",
        correctAnswer: "1",
        incorrectAnswers: ["2", "3", "4"]
     },
     {
        question: "What is 2 + 2?",
        correctAnswer: "4",
        incorrectAnswers: ["5", "3", "7"]
     }
];

let availableQuestions = [];
let currentQuestion = [];
let currentAnswers = [];

newQuestion = () => {
    availableQuestions = [...questions];
    let random = Math.floor(Math.random() * 3);
    currentQuestion = (availableQuestions.splice(random, 1));
    question.innerHTML = currentQuestion[0].question;

    currentAnswers = currentQuestion[0].incorrectAnswers.concat(currentQuestion[0].correctAnswer);
    let i = 0;

while (i < choices.length) {
  choices[i].innerHTML = currentAnswers[i];
  i++;
}
}

newQuestion()

console.log(choices)