const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
//declare variable
let currentQuestion = {};//create a empty object
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [ //this are the values in array for questions
    {
        question: "What is 5 + 3?",
        choice1: '2',
        choice2: '4',
        choice3: "8",
        choice4: "10",
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<p>",
        choice3: "<body>",
        choice4: "html",
        answer: 1

    },
    {
        question: "Which type of language is JavaScript?",
        choice1: "Object-Oriented",
        choice2: "Object-based",
        choice3: "Assembly-Language",
        choice4: "High-Level",
        answer: 2
    },

    {
        question: "Which one of the following also known as Conditional Expression:",
        choice1: "Alternative to if-else",
        choice2: "Switch statement",
        choice3: "If-then-else statement",
        choice4: "immediate if",
        answer: 4
    }

];


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
//start game fn creation
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //copy the ques array in availablequestions
    getNewQuestion();//fn call is for every time user refersh its create a random array
    //it call the below fn
}


getNewQuestion = () => {
     //if there is no question or questioncounter is finished then it store the score in localstorage
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) { 
        localStorage.setItem('mostRecentScore', score);//mostRecentscore is key and score is value
        
        //if if is passes it will redirect to end page
        return window.location.assign('end.html');
    }

    questionCounter++; //if the above if condition is not true then it increases the question
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;//its display the qc of mq in progress
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;///its diplay the increased width if bar img

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);//its randomly select the question in ary

    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;//goes to html text and display the question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';//its cjeck the selected answer is =to correctanswer then it add class of correct or incorrect
         //if user select the crct ans then call the fn incerementsore
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }
         //its select the parentele and add the correct/incorrect that is classToApply
        selectedChoice.parentElement.classList.add(classToApply);

         //remove the correct or incorrect ,so it doesn't display after 1000ms
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();//it fetches nxt random question
        }, 1000);
    });

});
// every times user choosem crct the score increases by 100
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();