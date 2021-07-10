$("#checkbtn").click(function () {
    var idkredensial = $("#idkredensialinput").val();
    if (idkredensial == "") {
        $.alert({
            title: 'Hey!',
            content: "ID Kredensial field is required",
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
        $("#checkbtn").attr("disabled", true);
        $("#checkbtn").text("Loading");
        actionfirebase();
    }
});

function actionfirebase() {
    var idk = $("#idkredensialinput").val();
    console.log(idk)
    firebase.database().ref().orderByChild('idkredensial').equalTo(idk).on("value", function (snapshot) {
        //console.log(snapshot.val());
        var snapval = snapshot.val();
        if (snapval == null) {
            $.alert({
                title: 'Not Found!',
                content: 'There is no Certificate with that Credential ID!',
                buttons: {
                    oke: {
                        text: 'Okay',
                        btnClass: 'btn-blue',
                        isHidden: false,
                        isDisabled: false,
                        action: function (hubPanitia) {
                            $("#checkbtn").text("Check");
                            $("#checkbtn").attr("disabled", false);
                        }
                    },
                }
            });
        } else {
            snapshot.forEach(function (data) {
                var datakey = data.key;
                firebase.database().ref(datakey).on('value', (snapshot) => {
                    const data = snapshot.val();
                    var namalengkap = data.namalengkap;
                    var tipe = data.tipe;
                    var idkredensial = data.idkredensial;
                    var message = "Certificate with Credential ID: " + idkredensial + " registered in the name <b>" + namalengkap + "</b> as " + tipe;
                    $.alert({
                        title: 'Information',
                        content: message,
                        buttons: {
                            oke: {
                                text: 'Okay',
                                btnClass: 'btn-blue',
                                isHidden: false,
                                isDisabled: false,
                                action: function (hubPanitia) {
                                    $("#checkbtn").text("Check");
                                    $("#checkbtn").attr("disabled", false);
                                }
                            },
                        }
                    });
                });
            });
        }
    });
}