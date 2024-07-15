const questions = [
    {
        question: " The question will go here",
        ansers:[
            { text: "answer1", correct: true},
            { text: "answer2", correct: true},
            { text: "answer3", correct: true},
            { text: "answer4", correct: true},
        ]
    },
    {
        question: " The question will go here",
        ansers:[
            { text: "answer1", correct: true},
            { text: "answer2", correct: true},
            { text: "answer3", correct: true},
            { text: "answer4", correct: true},
        ]
    },
    {
        question: " The question will go here",
        ansers:[
            { text: "answer1", correct: true},
            { text: "answer2", correct: true},
            { text: "answer3", correct: true},
            { text: "answer4", correct: true},
        ]
    },
    {
        question: " The question will go here",
        ansers:[
            { text: "answer1", correct: true},
            { text: "answer2", correct: true},
            { text: "answer3", correct: true},
            { text: "answer4", correct: true},
        ]
    },
    {
        question: " The question will go here",
        ansers:[
            { text: "answer1", correct: true},
            { text: "answer2", correct: true},
            { text: "answer3", correct: true},
            { text: "answer4", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    curretnQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }
}

startQuiz();