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

const loadInquizition = () => {
    let email = $('#userEmail').val();
    let password = $('#userPwd').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        window.location.replace("selection.html");
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#loginWarning').html(loginWarning);
        // ...
    });
}

const loadRegistration = () => {
    window.location.replace("registration.html");
}