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
            $("#sertifbtn").attr("href", urlsertif);
        } else if (ceksertif == "No") {
            $("#sertifno").attr("hidden", false);
            $("#sertifyes").attr("hidden", true);
        }
    });
}

$("#keluarbtn").click(function () {
    $.alert({
        title: 'Jangan!',
        content: 'jangan pergi, jangan tinggalin aku :(',
        buttons: {
            oke: {
                text: 'Oke',
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
                    window.location.replace("/");
                }
            },
        }
    });
});

$("#simpandatabtn").click(function () {
    var namalengkap = $("#input_namalengkap").val();
    var email = $("#input_email").val();
    var tipe = $("#input_tipe").val();
    var cekig = $("#input_cekig").val();
    var ceksertif = $("#input_ceksertif").val();
    var urlfoto = $("#input_urlfoto").val();
    var urlsertif = $("#input_urlsertif").val();
    var idkredensial = $("#input_idkredensial").val();
    firebase.database().ref().push({
        namalengkap: namalengkap,
        email: email,
        tipe: tipe,
        cekig: cekig,
        ceksertif: ceksertif,
        urlfoto: urlfoto,
        urlsertif: urlsertif,
        idkredensial: idkredensial
    }, (error) => {
        if (error) {
            alert("Error");
            alert(error);
        } else {
            alert("Tersimpan");
        }
    });
});
