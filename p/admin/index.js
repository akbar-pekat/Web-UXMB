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