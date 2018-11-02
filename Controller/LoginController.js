const registerUser = () => {
    username = $('#userName').val();
    let email = $('#userEmail').val();
    let password = $('#userPwd').val();
    let signupSuccess = true;
    if(username == "") {
        $('#usernameWarning').html(usernameWarning);
        signupSuccess = false;
    } else {
        $('#usernameWarning').html("");
    }
    if(!validateEmail(email)) {
        $('#emailWarning').html(emailWarning);
        signupSuccess = false;
    } else {
        $('#emailWarning').html("");
    }
    if(!validatePwd(password)) {
        $('#pwdWarning').html(pwdWarning);
        signupSuccess = false;
    } else {
        $('#pwdWarning').html("");
    }
    if (signupSuccess) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }  
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user.updateProfile({
            displayName: username,
        }).then(function () {
            window.location.replace("admin.html");
        }, function (error) {
            // An error happened.
        });
   }
   else{
       console.log("User signed out");
   }
});