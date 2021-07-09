$("#caribtn").click(function () {
    var idkredensial = $("#idkredensialinput").val();
    if (idkredensial == "") {
        $.alert({
            title: 'Kesalahan!',
            content: 'Kolom ID Kredensial wajib diisi!',
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
        $("#caribtn").attr("disabled", true);
        $("#caribtn").text("Loading");
        actionfirebase();
    }
});

function actionfirebase() {
    var idk = $("#idkredensialinput").val();
    firebase.database().ref().orderByChild('idkredensial').equalTo(idk).on("value", function (snapshot) {
        //console.log(snapshot.val());
        var snapval = snapshot.val();
        if (snapval == null) {
            $.alert({
                title: 'Kesalahan!',
                content: 'Tidak terdapat Sertifikat dengan ID Kredensial tersebut!',
                buttons: {
                    oke: {
                        text: 'Oke',
                        btnClass: 'btn-blue',
                        isHidden: false,
                        isDisabled: false,
                        action: function (hubPanitia) {
                            $("#caribtn").text("Cari");
                            $("#caribtn").attr("disabled", false);
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
                    var idkredensial= data.idkredensial;
                    var message = "Sertifikat dengan ID Kredensial: "+idkredensial+" tercatat atas nama "+namalengkap+" ("+tipe+")."
                    $.alert({
                        title: 'Informasi',
                        content: message,
                        buttons: {
                            oke: {
                                text: 'Oke',
                                btnClass: 'btn-blue',
                                isHidden: false,
                                isDisabled: false,
                                action: function (hubPanitia) {
                                    $("#caribtn").text("Cari");
                                    $("#caribtn").attr("disabled", false);
                                }
                            },
                        }
                    });
                });
            });
        }
    });
}