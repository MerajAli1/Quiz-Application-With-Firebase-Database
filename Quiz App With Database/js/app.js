// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKj6ZVa8eX_9O-cQreqV5igFBN7ASB55A",
    authDomain: "quiz-app-269a5.firebaseapp.com",
    projectId: "quiz-app-269a5",
    storageBucket: "quiz-app-269a5.appspot.com",
    messagingSenderId: "192074109670",
    appId: "1:192074109670:web:7736d205701f10359e2127",
    measurementId: "G-EXSKNPDMW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()

var loader = document.getElementById('loader')
var showQuestions = document.getElementById('showQuestions')

function getDataFromDatabase() {
    loader.style.display = 'block'
    showQuestions.style.display = 'none'
    const reference = ref(db, 'questions/')
    onChildAdded(reference, function (data) {
        console.log(data.val())
        questions.push(data.val())
        loader.style.display = 'none'
        showQuestions.style.display = 'block'
        renderQuestion()
    })
}
getDataFromDatabase()


var questions = []
// Getting id's From HTML elements
var currentQuestion = document.getElementById('currentQuestion')
var totalQuestion = document.getElementById('totalQuestion')
var question = document.getElementById('question')
var answerParent = document.getElementById('answerParent')

// For Calling Questions From Array
var indexNum = 0
// For Calling Correct Ans From Array
var score = 0
// Function For Rendering Qno And its options
window.nextQuestion = function () { //Function For Next Question
    if (indexNum + 1 == questions.length) {
        alert("Your Score is:" + score)
    } else {
        indexNum++
        renderQuestion()
    }
}
window.checkingQuestion = function (a, b) { //Function For Checking Question
    if (a == b) {
        score++
        console.log(score)
    }
    nextQuestion()
}
renderQuestion()


function renderQuestion() {
    currentQuestion.innerHTML = indexNum + 1 //Current Question Calling
    totalQuestion.innerHTML = questions.length // Total Question Calling From Array
    var obj = questions[indexNum] // Just For Simplicity To Store Ques from array
    question.innerHTML = obj.question // Questions Calling
    answerParent.innerHTML = " " // Empty The Options Just Before Loop
    for (var i = 0; i < obj.options.length; i++) { //Applying Loop For Calling options From Array
        answerParent.innerHTML += `<div class="col-md-4"> 
        <div class="py-2">
            <button onclick="checkingQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-light fs-4 rounded w-100"> 
                ${obj.options[i]}
            </button>
        </div>
    </div>`
    }

}

