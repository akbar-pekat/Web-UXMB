$("#masukbtn").click(function () {
    var email = $("#emailinput").val();
    if (email == "") {
        $.alert({
            title: 'Yaelah!',
            content: "Isi dulu emailnya dong!",
            buttons: {
                oke: {
                    text: 'Oke',
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
                title: 'Kesalahan!',
                content: 'Email kamu gak terdaftar di server',
                buttons: {
                    hubPanitia: {
                        text: 'Hubungi Panitia',
                        btnClass: 'btn-default',
                        isHidden: false,
                        isDisabled: false,
                        action: function (hubPanitia) {
                            $("#masukbtn").text("Masuk");
                            $("#masukbtn").attr("disabled", false);
                            window.location.replace("https://t.me/akbarpekat");
                        }
                    },
                    oke: {
                        text: 'Oke',
                        btnClass: 'btn-blue',
                        isHidden: false,
                        isDisabled: false,
                        action: function (hubPanitia) {
                            $("#masukbtn").text("Masuk");
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
                            title: 'Eitss!',
                            content: 'Kamu belum follow @akbarpekat di Instagram, follow dulu yah :)',
                            buttons: {
                                bukaIG: {
                                    text: 'Buka Instagram',
                                    btnClass: 'btn-blue',
                                    isHidden: false,
                                    isDisabled: false,
                                    action: function (bukaIG) {
                                        window.location.href = "https://www.instagram.com/akbarpekat";
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