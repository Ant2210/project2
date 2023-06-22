const question = document.getElementById('question');
const choices = document.getElementsByClassName('choices');
const progress = document.getElementById('progress');
const currentScore = document.getElementById('current-score');

let questions = [
    {
       question: "What comes first alphabetically",
       correctAnswer: "A",
       incorrectAnswers: ["B", "C", "D"]
    }, 
    {
        question: "What comes first numerically",
        correctAnswer: "1",
        incorrectAnswers: ["2", "3", "4"]
     },
     {
        question: "What is 2 + 2",
        correctAnswer: "4",
        incorrectAnswers: ["5", "3", "7"]
     }
];
let availableQuestions = [];
let currentQuestion = [];

newQuestion = () => {
    availableQuestions = [...questions];
    let random = Math.floor(Math.random() * 3);
    currentQuestion.push(availableQuestions.splice(random, 1));
    console.log(currentQuestion);
    console.log(availableQuestions)
}

newQuestion()