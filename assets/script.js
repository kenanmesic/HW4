var coin = new Audio("./assets/wav/coin.wav")
var letsGo = new Audio("./assets/wav/LetsGo.wav")
var wrong = new Audio("./assets/wav/wrong.mp3")
// var themeSong = new Audio ("./assets/wav/ThemeSong.wav") 

const questions = [
    {
        question: "What is an Array?",
        choices: ["a. data in contiguous memory locations", 
        "b. a string of numbers in a function", 
        "c. events leading to a failure", 
        "d. specific results from an ordered list"],
        answer: "a. a collection of items of same data type stored at contiguous memory locations"
    },
    {
        question: "How many letters is 'Function'",
        choices: ["a. commas", 
        "b. twelve", 
        "c. eight",
        "d. two"],
        answer: "c. eight"
    },
    {
        question: "Is coding hard?",
        choices: ["a. of course", 
        "b. depends on the person", 
        "c. never", 
        "d. no clue what im doing"],
        answer: "b. depends on the person"
    },
    {
        question: "Are we getting 100% on this project?",
        choices: ["a. of course", 
        "b. nope, its late as hell", 
        "c. fingers crossed", 
        "d. all day every day"],
        answer: "c. fingers crossed"
    },
    {
        question: "What days do you we have class?",
        choices: ["a. Th, Fri & Sat", 
        "b. Mon, Tue & Thu", 
        "c. I dont show up", 
        "d. Im in class?"],
        answer: "b. Mon, Tue & Thu"
    },
    {
        question: "How do we call an API",
        choices: ["a. Toss", 
        "b. throw", 
        "c. fetch", 
        "d. call myFunction"],
        answer: "c. fetch"
    },
    {
        question: "Does every site have an API",
        choices: ["a. Havent checked", 
        "b. no", 
        "c. every single one", 
        "d. Whats an API?"],
        answer: "b. o"
    },
    {
        question: "The first index of an array is ____.",
        choices: ["a. 0", 
        "b. 1", 
        "c. 8", 
        "d. any"],
        answer: "a. 0"
    },
    {
        question: "Who invented JavaScript?",
        choices: ["a. Douglas Crockford", 
        "b. Sheryl Sandberg", 
        "c. Brendan Eich", 
        "d. Ben Javascript"],
        answer: "c. Brendan Eich"
    },
    {
        question: "What is global scope?",
        choices: ["a. if i == 5 then", 
        "b. if i = 5 then", 
        "c. if(i == 5)", 
        "d. if i = 5"],
        answer: "c. if(i == 5)"
    },
    {
        question: "What is the purpose of an array?",
        choices: ["a. //This is a comment", 
        "b. <!--This is a comment-->", 
        "c. 'This is a comment", 
        "d. * This is a comment *"],
        answer: "a. //This is a comment"
    },
    {
        question: "How do you find out how many items are in an array?",
        choices: ["a. onclick", 
        "b. onchange", 
        "c. onmouseover", 
        "d. onmouseclick"],
        answer: "a. onclick"
    }
];

// grab references ------> elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// Function start

// Button click
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";
    letsGo.play("./assets/wav/LetsGo.wav")

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
    showQuiz();
};

// Next questions and choices
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// Results, if answer is right or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // +1 to score
        correctAns++;
        answerCheck.textContent = "Correct!";
        coin.play("./assets/wav/coin.wav")
    } else {
        // wrong answer, deduct 5 second from timer, response with correct answer
        totalTime -= 5;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
        wrong.play("./assets/wav/wrong.mp3")
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// Game over, score
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
}

// Enter in name
function storeHighScores(event) {
    event.preventDefault();

    // Stop function
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // Move score to savedHighScores @ localstorage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // JSON.stringify
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // Start of Highscores
    showHighScores();
}

// Function for HighScores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    // Local Storage check
    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});