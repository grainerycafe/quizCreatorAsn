//html for new question
var emptyQuestion = '<div id="questionBlock' + qIdx + '">' +
    '<div class="row" id="qHeader">' +
    '<h4>Question:</h4>' +
    '<div class="col-xs-12">' +
    '<textarea id="questionBox' + qIdx + '" class="col-xs-12 col-md-6" rows="4"></textarea>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div id="mcChoice" class="col-xs-12 col-md-6">' +
    '<input id="radioChoice' + qIdx + '0" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
    '<input id="txtChoice' + qIdx + '0" type="text" class="col-xs-11">' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div id="mcChoice" class="col-xs-12 col-md-6">' +
    '<input id="radioChoice' + qIdx + '1" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
    '<input id="txtChoice' + qIdx + '1" type="text" class="col-xs-11">' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div id="mcChoice" class="col-xs-12 col-md-6">' +
    '<input id="radioChoice' + qIdx + '2" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
    '<input id="txtChoice' + qIdx + '2" type="text" class="col-xs-11">' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div id="mcChoice" class="col-xs-12 col-md-6">' +
    '<input id="radioChoice' + qIdx + '3" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
    '<input id="txtChoice' + qIdx + '3" type="text" class="col-xs-11">' +
    '</div>' +
    '</div>' +
    '<div id="choiceContainer">' +
    '<input id="diffCheck' + qIdx + '0" type="radio" name="radioDiff' + qIdx + '" value="hard"> Hard  ' +
    '<input id="diffCheck' + qIdx + '1" type="radio" name="radioDiff' + qIdx + '" value="easy"> Easy  ' +
    '<button class="deleteQuestion btn-danger" onclick="deleteQuestion(this)">Delete Question</button>' +
    '</div>' +
    '</div>';

//updates the empty question with new qIdx
const updateQuiz = () => {
    emptyQuestion = '<div id="questionBlock' + qIdx + '">' +
        '<div class="row">' +
        '<h4>Question:</h4>' +
        '<div class="col-xs-12">' +
        '<textarea id="questionBox' + qIdx + '" class="col-xs-12 col-md-6" rows="4"></textarea>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + qIdx + '0" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
        '<input id="txtChoice' + qIdx + '0" type="text" class="col-xs-11">' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + qIdx + '1" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
        '<input id="txtChoice' + qIdx + '1" type="text" class="col-xs-11">' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + qIdx + '2" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
        '<input id="txtChoice' + qIdx + '2" type="text" class="col-xs-11">' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + qIdx + '3" type="radio" name="radio' + qIdx + '" class="col-xs-1">' +
        '<input id="txtChoice' + qIdx + '3" type="text" class="col-xs-11">' +
        '</div>' +
        '</div>' +
        '<div id="choiceContainer">' +
        '<input id="diffCheck' + qIdx + '0" type="radio" name="radioDiff' + qIdx + '" value="hard"> Hard  ' +
        '<input id="diffCheck' + qIdx + '1" type="radio" name="radioDiff' + qIdx + '" value="easy"> Easy  ' +
        '<button class="deleteQuestion btn-danger" onclick="deleteQuestion(this)">Delete Question</button>' +
        '</div>' +
        '</div>';
}

//updates quiz taker from quiz maker data
const updateQuizModel = (quizData) => {
    let quizTakerContainer = doc.getElementById("quizTakerContainer");
    for (let i = 0; i < quizData.length; i++) {
        quizTakerContainer.innerHTML += '<div>' +
            '<h4>' + quizData[i].question + '</h4>' +
            '</div>' +
            '<div class="row">' +
            '<div id="mcChoice" class="col-xs-12 col-md-6">' +
            '<input id="' + quizData[i].radioId[0] + '" type="radio" name="radio' + i + '" class="col-xs-1">' +
            '<p><span id="' + quizData[i].textId[0] + '">' + quizData[i].options[0] + '</span></p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div id="mcChoice" class="col-xs-12 col-md-6">' +
            '<input id="' + quizData[i].radioId[1] + '" type="radio" name="radio' + i + '" class="col-xs-1">' +
            '<p><span id="' + quizData[i].textId[1] + '">' + quizData[i].options[1] + '</span></p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div id="mcChoice" class="col-xs-12 col-md-6">' +
            '<input id="' + quizData[i].radioId[2] + '" type="radio" name="radio' + i + '" class="col-xs-1">' +
            '<p><span id="' + quizData[i].textId[2] + '">' + quizData[i].options[2] + '</span></p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div id="mcChoice" class="col-xs-12 col-md-6">' +
            '<input id="' + quizData[i].radioId[3] + '" type="radio" name="radio' + i + '" class="col-xs-1">' +
            '<p><span id="' + quizData[i].textId[3] + '">' + quizData[i].options[3] + '</span></p>' +
            '</div>' +
            '</div>'
    }
    $('#userScore').hide();
}

//load quiz taker
const loadQuiz = () => {
    $('#hardBtn').show();
    $('#easyBtn').show();
    $('#markerBtn').hide();
    $('#quizNotFound').hide();
}

//load quiz maker
const loadPage = () => {
    $('#warningMsg').hide();
    $('#successMsg').hide();
}

//display save messages
const displayMsg = (bool) => {
    if (bool) {
        $('#successMsg').show();
        $('#warningMsg').hide();
    } else {
        $('#warningMsg').show();
        $('#successMsg').hide();
    }
}

//updates quiz taker from quiz maker data
const loadQuestion = (questionData, count) => {
    let quizTakerContainer = doc.getElementById("quizTakerContainer");
    quizTakerContainer.innerHTML += '<div>' +
        '<h4>' + questionData.question + '</h4>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + count + '0" type="radio" name="radio' + count + '" class="col-xs-1">' +
        '<p><span id="textChoice' + count + '0">' + questionData.options[0] + '</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + count + '1" type="radio" name="radio' + count + '" class="col-xs-1">' +
        '<p><span id="textChoice' + count + '1">' + questionData.options[1] + '</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + count + '2" type="radio" name="radio' + count + '" class="col-xs-1">' +
        '<p><span id="textChoice' + count + '2">' + questionData.options[2] + '</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="mcChoice" class="col-xs-12 col-md-6">' +
        '<input id="radioChoice' + count + '3" type="radio" name="radio' + count + '" class="col-xs-1">' +
        '<p><span id="textChoice' + count + '3">' + questionData.options[3] + '</span></p>' +
        '</div>' +
        '</div>';
    $('#userScore').hide();
}