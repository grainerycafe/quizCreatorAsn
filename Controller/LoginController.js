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