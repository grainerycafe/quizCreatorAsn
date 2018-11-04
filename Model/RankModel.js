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

const loadSelection = () => {
    window.location.replace("selection.html");
}

const logOutUser = () => {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}