const loadRankingsData = () => {
    loadHardRankings();
    loadEasyRankings();
}

const loadHardRankings = () => {
    let ref = firebase.database().ref("hardscores");
    ref.orderByChild('score').on("value", function (snapshot) {
        currentUser = firebase.auth().currentUser.displayName;
        let rank = snapshot.numChildren();
        snapshot.forEach(function (data) {
            if (currentUser == data.val().username) {
                let userRank = '<tr><td>' + rank + '</td><td style="color:green"><b>' + data.val().username + '</b></td><td>' + data.val().score + '</td></tr>'
                $('#hardRankTable').prepend(userRank);
            } else {
                let userRank = '<tr><td>' + rank + '</td><td>' + data.val().username + '</td><td>' + data.val().score + '</td></tr>'
                $('#hardRankTable').prepend(userRank);
            }
            rank--;
            if (rank === 0) {
                let tableHeaders = '<tr><th>Rank</th><th>Username</th><th>Score</th></tr>';
                $('#hardRankTable').prepend(tableHeaders);
            }
        });
    });
}

const loadEasyRankings = () => {
    let ref = firebase.database().ref("easyscores");
    ref.orderByChild('score').on("value", function (snapshot) {
        currentUser = firebase.auth().currentUser.displayName;
        let rank = snapshot.numChildren();
        snapshot.forEach(function (data) {
            if (currentUser == data.val().username) {
                let userRank = '<tr><td>' + rank + '</td><td style="color:green"><b>' + data.val().username + '</b></td><td>' + data.val().score + '</td></tr>'
                $('#easyRankTable').prepend(userRank);
            } else {
                let userRank = '<tr><td>' + rank + '</td><td>' + data.val().username + '</td><td>' + data.val().score + '</td></tr>'
                $('#easyRankTable').prepend(userRank);
            }
            rank--;
            if (rank === 0) {
                let tableHeaders = '<tr><th>Rank</th><th>Username</th><th>Score</th></tr>';
                $('#easyRankTable').prepend(tableHeaders);
            }
        });
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.replace("index.html");
    }
});