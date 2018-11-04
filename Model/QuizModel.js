// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFqA6ulx2RURKeOTz0vHuKlOmeMG609xc",
    authDomain: "comp4711quiz.firebaseapp.com",
    databaseURL: "https://comp4711quiz.firebaseio.com",
    projectId: "comp4711quiz",
    storageBucket: "comp4711quiz.appspot.com",
    messagingSenderId: "866397329005"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var radioIdx = 0;

var doc = document;

var numOptions = 4;

var diffOptions = 2;

var qIdx = 0;

var userScore = 0;

var quizContainer = document.getElementById("quizContainer");

var quiz = [];

var quizAnswers = [];

var quizSaved = false;

var isEasy = -1;

//quiz getter for quiz taker
const getQuiz = (difficulty) => {
    let quizData = database.ref(difficulty);
    if (difficulty === 'hard') {
        isEasy = 0;
    } else {
        isEasy = 1;
    }
    quizData.on('value', function (snapshot) {
        let count = 0;
        snapshot.forEach(function (childSnapshot) {
            quiz.push(childSnapshot.val());
            loadQuestion(childSnapshot.val(), count);
            quizAnswers.push(childSnapshot.val().answer);
            count++;
        });
        if (quiz.length > 0) {
            $('#markerBtn').show();
            $('#quizNotFound').hide();
        } else {
            $('#quizNotFound').show();
            $('#markerBtn').hide();
        }
    });
    $('#hardBtn').hide();
    $('#easyBtn').hide();
    $('#quizNotFound').hide();
}


//marks user answers
const markAnswers = () => {
    let scoreTotal = 0;
    for (let i = 0; i < quizAnswers.length; i++) {
        for (let j = 0; j < numOptions; j++) {
            if (doc.getElementById("radioChoice" + i + j).checked && j === quizAnswers[i]) {
                doc.getElementById("textChoice" + i + j).setAttribute("style", "background-color: #7FFF00");
                userScore++;
            } else if (doc.getElementById("radioChoice" + i + j).checked) {
                doc.getElementById("textChoice" + i + j).setAttribute("style", "background-color: #F08080");
                doc.getElementById("textChoice" + i + quizAnswers[i]).setAttribute("style", "background-color: #7FFF00");
            } else {
                doc.getElementById("textChoice" + i + quizAnswers[i]).setAttribute("style", "background-color: #7FFF00");
            }
            doc.getElementById("radioChoice" + i + j).setAttribute("disabled", true);
        }
        scoreTotal++;
    }
    let userPercent = Math.round((userScore / scoreTotal).toFixed(2) * 100);
    console.log(userPercent + "%");
    doc.getElementById('userScore').innerHTML = userPercent + "%";
    $('#userScore').show();
    let userID = firebase.auth().currentUser.uid;
    let username = firebase.auth().currentUser.displayName;
    let scoreObj = { username: username, score: userPercent };
    if(isEasy === 0) {
        let postUserScore = database.ref("hardscores");
        postUserScore.child(userID).push();
        postUserScore.child(userID).set(scoreObj);
    } else if (isEasy === 1) {
        let postUserScore = database.ref("easyscores");
        postUserScore.child(userID).push();
        postUserScore.child(userID).set(scoreObj);
    }
    $('#markerBtn').hide();
    $('#rankingBtn').show();
}

//save input data in quiz maker
const saveInput = () => {
    let questList = [];
    for (let i = 0; i < qIdx; i++) {
        let questBox = "";
        let radioChecked = "";
        let diffChecked = "";
        let txtChoices = [];
        if (doc.getElementById("questionBox" + i) !== null) {
            questBox = doc.getElementById("questionBox" + i).value;
            for (let j = 0; j < numOptions; j++) {
                if (doc.getElementById("radioChoice" + i + j).checked) {
                    radioChecked = "radioChoice" + i + j;
                }
                txtChoices.push(doc.getElementById("txtChoice" + i + j).value);
            }
            for (let k = 0; k < diffOptions; k++) {
                if (doc.getElementById("diffCheck" + i + k).checked) {
                    diffChecked = "diffCheck" + i + k;
                }
            }
        }
        let questObj = { questionBox: questBox, radioCheckId: radioChecked, textChoices: txtChoices, checkedDiff: diffChecked };
        questList.push(questObj);
    }
    return questList;
}

//restore input in quiz maker
const restoreData = (savedList) => {
    for (let i = 0; i < qIdx; i++) {
        if (doc.getElementById("questionBox" + i) !== null) {
            doc.getElementById("questionBox" + i).innerHTML = savedList[i].questionBox;
            for (let j = 0; j < numOptions; j++) {
                doc.getElementById("txtChoice" + i + j).value = savedList[i].textChoices[j];
            }
            if (savedList[i].radioCheckId !== "") {
                doc.getElementById(savedList[i].radioCheckId).setAttribute("checked", true);
            }
            if (savedList[i].checkedDiff !== "") {
                doc.getElementById(savedList[i].checkedDiff).setAttribute("checked", true);
            }
        }
    }
    $('#warningMsg').hide();
    $('#successMsg').hide();
}

const loadAdmin = () => {
    window.location.replace("admin.html");
}

const loadUser = () => {
    window.location.replace("user.html");
}

const loadSelection = () => {
    window.location.replace("selection.html");
}

const loadRankings = () => {
    window.location.replace("rankings.html");
}

const logOutUser = () => {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email);
    } else {
        window.location.replace("index.html");
    }
});