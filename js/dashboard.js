var selector = '.card-body .thumbtn img';

$(selector).on('click', function () {
    $(selector).removeClass('thumbnail-active');
    $(this).addClass('thumbnail-active');
    var urlyutub = $(this).attr('data-url');
    var player = videojs.players.vid1;
    player.poster('');
    player.src({
        src: urlyutub,
        type: 'video/youtube'
    });
});

var datakey = localStorage.getItem("datakey");
if (datakey == null) {
    window.location.replace("index.html");
} else {
    firebase.database().ref(datakey).on('value', (snapshot) => {
        const data = snapshot.val();
        var namalengkap = data.namalengkap;
        var ceksertif = data.ceksertif;
        var urlsertif = data.urlsertif;
        $(".username").text(namalengkap);
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

setTimeout(function () {
    $(".boxload").fadeOut();
}, 5000);

$("#signoutbtn").click(function () {
    localStorage.removeItem("datakey");
    window.location.replace("index.html");
});