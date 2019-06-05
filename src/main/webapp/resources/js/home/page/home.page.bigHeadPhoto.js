home.page.bigHeadPhoto = (function () {
    var configMap = {
        main_html: '<img class="bigHeadPhoto" />',
        dialog_html: '<div id="dialog">' +
        '<div>' +
        '<input type="file" name="file" id="bigHeadPhoto"/>' +
        '<div class="img-cut"></div>' +
        '<button class="okBtn">確定</button>' +
        '</div>',
        upload_url: 'rest/upload',
        imgCutUpload_url: '/rest/imgCut',
        dialog_option: {
            modal: true,
            title: "請上傳大頭照",
            resizable: false,
            draggable: false,
            autoOpen: false,
            minHeight: 0,
            width: 500
        },
        Module_imgCutOpt: {
            selectionWidthRatio: 7,//裁減框的寬度比，可直接給實際尺寸
            selectionHeightRatio: 9//裁減框的高度比，可直接給實際尺寸
        }
    }, stateMap = {
        imgSrc: null
    }, jqueryMap = {
        $container: null,
        $bigHeadPhoto: null,
        $dialog: null,
        $fileForm: null,
        $imgCut: null
    }, setJqueryMap, init, onImgClick, onBigHeadPhotoChange, onImgUploadCallBack, initModule_imgCut, onOkBtnClick, uploadImgCut;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$bigHeadPhoto = $container.find(".bigHeadPhoto");
        jqueryMap.$dialog = $(configMap.dialog_html);
        jqueryMap.$fileForm = jqueryMap.$dialog.find("#fileForm");
        jqueryMap.$imgCut = jqueryMap.$dialog.find(".img-cut");
    };
    onImgClick = function () {
        jqueryMap.$dialog.dialog("open");
    };
    onImgUploadCallBack = function (response) {
        initModule_imgCut(response.data.imgSrc);
    };
    initModule_imgCut = function (src) {
        stateMap.imgSrc = src;
        setTimeout(function () {
            var moduleImgCut = new Module_imgCut();
            jqueryMap.$imgCut.data("Module_imgCut", moduleImgCut);
            var opt = configMap.Module_imgCutOpt;
            moduleImgCut.init(jqueryMap.$imgCut, $.extend(true, {src: src}, opt));
        }, 500);
    };
    onBigHeadPhotoChange = function () {
        var form = new FormData();
        form.append('file', this.files[0]);
        $.ajax({
            url: configMap.upload_url,
            data: form,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(onImgUploadCallBack);
    };
    uploadImgCut = function (imgSrc) {
        var moduleImgCut = jqueryMap.$imgCut.data("Module_imgCut");
        if (moduleImgCut) {
            var data = moduleImgCut.getSelection();
            var narrowDownPercent = moduleImgCut.getNarrowDownPercent();
            if (narrowDownPercent != 0 && narrowDownPercent <= 1) {
                data.x1 = data.x1 / narrowDownPercent;
                data.y1 = data.y1 / narrowDownPercent;
                data.width = data.width / narrowDownPercent;
                data.height = data.height / narrowDownPercent;
            }
            data.fileName = imgSrc;
            return $.add(configMap.imgCutUpload_url, data).then(function (response) {
                return response.imgSrc;
            });
        } else {
            var $def = $.Deferred();
            $def.resolve(imgSrc);
            return $def;
        }
    };
    onOkBtnClick = function () {
        uploadImgCut(stateMap.imgSrc).then(function(afterCutImgSrc){
            jqueryMap.$bigHeadPhoto.attr("src",afterCutImgSrc);
            jqueryMap.$dialog.dialog("close");
        });
    };

    init = function ($container, imgSrc) {
        var $img = $(configMap.main_html);
        $img.attr("src", imgSrc);
        $container.append($img);
        setJqueryMap($container);
        jqueryMap.$dialog.dialog(configMap.dialog_option);
        $img.click(onImgClick);
        jqueryMap.$dialog.on("click", ".okBtn", onOkBtnClick);
        $("body").on("change", "#bigHeadPhoto", onBigHeadPhotoChange)
    };
    return {
        init: init
    }
})();