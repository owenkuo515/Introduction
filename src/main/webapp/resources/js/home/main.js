$(function () {
    home.shell.init($("#home-container"));
    var $loader = $("<div id='loader' style='position:absolute;width:100%;height:100%;left:0;top:0;'>" +
        "<img style='position:relative;left:50%;top:50%;' src='/resources/img/loading.gif'/>" +
        "</div>");
    var showLoader = function () {
        $("body").append($loader);
    };
    var closeLoader = function () {
        $("#loader").remove();
    };
    var xhr;
    $.ajaxSetup({
        beforeSend: function (xhrObj) {
            if (xhr && xhr.readyState != 4 && xhr.readyState != 0) {
                xhr.abort();
            }
            xhr = xhrObj;
            showLoader();
        },
        complete: function (xhrObj) {
            if (xhr === xhrObj) {
                closeLoader();
            }
        }
    });
});