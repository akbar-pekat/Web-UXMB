$("#signinbtn").on('click', function () {
    var inputemail = $("#inputemail").val();
    if (inputemail == "") {
        alert("Email field is required");
    } else {
        actionfirebase()
    }
});

function actionfirebase() {
    var inputemail = $("#inputemail").val();
    firebase.database().ref('/').orderByChild('email').equalTo(inputemail).on("value", function (snapshot) {
        console.log(snapshot.val());
        var snapval = snapshot.val();
        if (snapval == null) {
            alert("Sorry, your email was not found in server!");
        } else {
            snapshot.forEach(function (data) {
                var datakey = data.key;
                firebase.database().ref(datakey).on('value', (snapshot) => {
                    const data = snapshot.val();
                    localStorage.setItem("datakey", datakey);
                    window.location.replace("dashboard.html");
                });
            });
        }
    });
}