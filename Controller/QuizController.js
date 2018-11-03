//add a new question block
const addQuestion = () => {
    let savedList = saveInput();
    quizContainer.innerHTML += emptyQuestion;
    restoreData(savedList);
    qIdx++;
    $('.saveQuiz').show();
    updateQuiz();
}

//delete question block
const deleteQuestion = (button) => {
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
}

//store input data for quiz taker
const saveQuiz = () => {
    let quest = "";
    let answ = -1;
    let count = 0;
    var questionListEasy = [];
    var questionListHard = [];
    for (let i = 0; i < qIdx; i++) {
        let opts = [];
        let radioCheck = false;
        let questionBoxCheck = true;
        let txtCheck = true;
        let diffCheck = false;
        let diffSelection = 0;
        if (doc.getElementById("questionBox" + i) != null) {
            quest = doc.getElementById("questionBox" + i).value;
            if (quest === "") {
                questionBoxCheck = false;
            }
            for (let j = 0; j < numOptions; j++) {
                if (doc.getElementById("radioChoice" + i + j).checked) {
                    answ = j;
                    radioCheck = true;
                }
                if (doc.getElementById("txtChoice" + i + j).value === "") {
                    txtCheck = false;
                }
                opts.push(doc.getElementById("txtChoice" + i + j).value);
            }
            for (let k = 0; k < diffOptions; k++) {
                if (doc.getElementById("diffCheck" + i + k).checked) {
                    diffCheck = true;
                    if (doc.getElementById("diffCheck" + i + k).value === "hard") {
                        diffSelection = 1;
                    } else if (doc.getElementById("diffCheck" + i + k).value === "easy") {
                        diffSelection = 2;
                    }
                }
            }
            if (radioCheck === true && questionBoxCheck === true && txtCheck === true && diffCheck === true) {
                count++;
            }
            let questionObj = { question: quest, answer: answ, options: opts };
            if (diffSelection === 1) {
                questionListHard.push(questionObj);
            } else if (diffSelection === 2) {
                questionListEasy.push(questionObj);
            }

        } else {
            count++;
        }
    }
    if (count === qIdx) {
        displayMsg(count === qIdx);
        let postEasyData = database.ref("easy");
        for (let i = 0; i < questionListEasy.length; i++) {
            let newPostEasy = postEasyData.push();
            if (i == questionListEasy.length - 1) {
                newPostEasy.set(questionListEasy[i]).then(function () {
                    window.location.replace("selection.html");
                });
            } else {
                newPostEasy.set(questionListEasy[i])
            }
        }
        let postHardData = database.ref("hard");
        for (let i = 0; i < questionListHard.length; i++) {
            let newPostHard = postHardData.push();
            if (i == questionListEasy.length - 1) {
                newPostHard.set(questionListHard[i]).then(function () {
                    window.location.replace("selection.html");
                });
            } else {
                newPostHard.set(questionListHard[i])
            }
        }
        quizSaved = true;
    } else {
        displayMsg(false);
    }
}

//check answers
const checkAnswers = () => {
    markAnswers();
}

$(window).on('beforeunload', () => {
    if (!quizSaved && qIdx > 0) {
        return "";
    }
});