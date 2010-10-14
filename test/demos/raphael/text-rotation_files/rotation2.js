$(window).load(function () {
    var hldr = $("#holder");
    var text = $("p", hldr).html();
    hldr.html("");
    var R = Raphael("holder", 640, 480);
    var txt = [];
    var attr = {font: '50px Helvetica, Arial', opacity: 0.5};
    txt[0] = R.text(320, 240, text).attr(attr).attr({fill: "hsb(120deg, .5, 1)"});
    txt[1] = R.text(320, 240, text).attr(attr).attr({fill: "hsb(0, .5, 1)"});
    txt[2] = R.text(320, 240, text).attr(attr).attr({fill: "hsb(240deg, .5, 1)"});
    var mouse = null, rot = 0;
    $(document).mousemove(function (e) {
        if (mouse === null) {
            mouse = e.pageX;
            return;
        }
        rot += e.pageX - mouse;
        txt[0].rotate(rot, true);
        txt[1].rotate(rot / 1.5, true);
        txt[2].rotate(rot / 2, true);
        mouse = e.pageX;
        R.safari();
    });
});