$("#checkbtn").on('click', function () {
    var inputsertifid = $("#inputsertifid").val();
    if (inputsertifid == "") {
        alert("Certificate ID field is required");
    } else {
        actionfirebase()
    }
});

function actionfirebase() {
    var inputsertifid = $("#inputsertifid").val();
    firebase.database().ref().orderByChild('idkredensial').equalTo(inputsertifid).on("value", function (snapshot) {
        var snapval = snapshot.val();
        if (snapval == null) {
            alert("Credential ID was not found in server!")
        } else {
            snapshot.forEach(function (data) {
                var datakey = data.key;
                firebase.database().ref(datakey).on('value', (snapshot) => {
                    const data = snapshot.val();
                    var namalengkap = data.namalengkap;
                    var tipe = data.tipe;
                    var idkredensial = data.idkredensial;
                    var message = "Certificate with Credential ID: " + idkredensial + " registered in the name " + namalengkap + " as " + tipe;
                    alert(message);
                });
            });
        }
    });
}