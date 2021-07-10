$("#masukbtn").click(function () {
    var email = $("#emailinput").val();
    if (email == "") {
        $.alert({
            title: 'Hey!',
            content: "Email field is required",
            buttons: {
                oke: {
                    text: 'Okay',
                    btnClass: 'btn-blue',
                    isHidden: false,
                    isDisabled: false,
                },
            }
        });
    } else {
        $("#masukbtn").attr("disabled", true);
        $("#masukbtn").text("Loading");
        actionfirebase();
    }
});

function actionfirebase() {
    var email = $("#emailinput").val();
    firebase.database().ref('/').orderByChild('email').equalTo(email).on("value", function (snapshot) {
        console.log(snapshot.val());
        var snapval = snapshot.val();
        if (snapval == null) {
            $.alert({
                title: 'Not Found!',
                content: 'This email was not found in our database',
                buttons: {
                    hubPanitia: {
                        text: 'Report',
                        btnClass: 'btn-default',
                        isHidden: false,
                        isDisabled: false,
                        action: function (hubPanitia) {
                            $("#masukbtn").text("Sign In");
                            $("#masukbtn").attr("disabled", false);
                            window.location.replace("https://t.me/akbarpekat");
                        }
                    },
                    oke: {
                        text: 'Okay',
                        btnClass: 'btn-blue',
                        isHidden: false,
                        isDisabled: false,
                        action: function (oke) {
                            $("#masukbtn").text("Sign In");
                            $("#masukbtn").attr("disabled", false);
                        }
                    },
                }
            });
        } else {
            snapshot.forEach(function (data) {
                var datakey = data.key;
                firebase.database().ref(datakey).on('value', (snapshot) => {
                    const data = snapshot.val();
                    var cekig = data.cekig;
                    if (cekig == "Yes") {
                        //alert("Sudah");
                        localStorage.setItem("datakey", datakey);
                        window.location.replace("dashboard.html");
                    } else {
                        $.alert({
                            title: 'Oops!',
                            content: 'To get access you must follow AkbarPekat on Instagram :)',
                            buttons: {
                                bukaIG: {
                                    text: 'Follow AkbarPekat',
                                    btnClass: 'btn-default',
                                    isHidden: false,
                                    isDisabled: false,
                                    action: function (bukaIG) {
                                        window.location.href = "https://www.instagram.com/akbarpekat";
                                    }
                                },
                                oke: {
                                    text: 'Okay',
                                    btnClass: 'btn-blue',
                                    isHidden: false,
                                    isDisabled: false,
                                    action: function (oke) {
                                        $("#masukbtn").text("Sign In");
                                        $("#masukbtn").attr("disabled", false);
                                    }
                                },
                            }
                        });
                    }
                });
            });
        }
    });
}