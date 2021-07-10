var datakey = localStorage.getItem("datakey");
if (datakey == null) {
    window.location.replace("login.html");
} else {
    firebase.database().ref(datakey).on('value', (snapshot) => {
        const data = snapshot.val();
        var namalengkap = data.namalengkap;
        var urlfoto = data.urlfoto;
        var ceksertif = data.ceksertif;
        var urlsertif = data.urlsertif;
        $(".username").text(namalengkap);
        $("#photouser").attr("src", urlfoto);
        if (ceksertif == "Yes") {
            $("#sertifyes").attr("hidden", false);
            $("#sertifno").attr("hidden", true);
            $("#sertifboss").attr("hidden", true);

            $("#tutorialcard").attr("hidden", false);
            $("#sertifbtn").attr("href", urlsertif);
        } else if (ceksertif == "No") {
            $("#sertifno").attr("hidden", false);
            $("#sertifyes").attr("hidden", true);
            $("#sertifboss").attr("hidden", true);

            $("#tutorialcard").attr("hidden", true);
        } else {
            $("#sertifno").attr("hidden", true);
            $("#sertifyes").attr("hidden", true);
            $("#sertifboss").attr("hidden", false);

            $("#tutorialcard").attr("hidden", true);

        }
    });
}

$("#keluarbtn").click(function () {
    $.alert({
        title: 'Please No!',
        content: 'Where are you going?',
        buttons: {
            oke: {
                text: 'Cancel',
                btnClass: 'btn-default',
                isHidden: false,
                isDisabled: false,
                action: function (hubPanitia) {
                    $("#masukbtn").text("Masuk");
                    $("#masukbtn").attr("disabled", false);
                }
            },
            goodbye: {
                text: 'Goodbye!',
                btnClass: 'btn-blue',
                isHidden: false,
                isDisabled: false,
                action: function (hubPanitia) {
                    localStorage.removeItem("datakey");
                    window.location.replace("login.html");
                }
            },
        }
    });
});