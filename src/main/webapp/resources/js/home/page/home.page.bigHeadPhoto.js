home.page.bigHeadPhoto = (function () {
    var configMap = {
        main_html: '<button class="edit-photo-btn">編輯</button>' +
        '<img class="bigHeadPhoto" />',
        dialog_html: '<div id="dialog">' +
        '<div>' +
        '<input type="file" name="file" id="bigHeadPhotoFile"/>' +
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
            width: 394
        },
        imgCutOpt: {
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
    }, setJqueryMap, init, onEditPhotoBtnClick, onBigHeadPhotoFileChange, onImgUploadCallBack, initImgCut, onOkBtnClick, uploadImgCut;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$bigHeadPhoto = $container.find(".bigHeadPhoto");
        jqueryMap.$dialog = $(configMap.dialog_html);
        jqueryMap.$fileForm = jqueryMap.$dialog.find("#fileForm");
        jqueryMap.$imgCut = jqueryMap.$dialog.find(".img-cut");
    };
    onEditPhotoBtnClick = function () {
        jqueryMap.$dialog.dialog("open");
        initImgCut(stateMap.imgSrc);
    };
    onImgUploadCallBack = function (response) {
        initImgCut(response.data.imgSrc);
    };
    initImgCut = function (src) {
        stateMap.imgSrc = src;
        setTimeout(function () {
            var imgCutModule = new imgCut.shell();
            jqueryMap.$imgCut.data("imgCut", imgCutModule);
            var opt = configMap.imgCutOpt;
            imgCutModule.init(jqueryMap.$imgCut, $.extend(true, {src: src}, opt));
        }, 100);
    };
    onBigHeadPhotoFileChange = function () {
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
        var moduleImgCut = jqueryMap.$imgCut.data("imgCut");
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
            var url = configMap.imgCutUpload_url + "/" + home.shell.getResumeData().id;
            return $.add(url, data).then(function (response) {
                return response.imgSrc;
            });
        } else {
            var $def = $.Deferred();
            $def.resolve(imgSrc);
            return $def;
        }
    };
    onOkBtnClick = function () {
        uploadImgCut(stateMap.imgSrc).then(function (afterCutImgSrc) {
            stateMap.imgSrc = afterCutImgSrc;
            jqueryMap.$bigHeadPhoto.attr("src", afterCutImgSrc);
            jqueryMap.$dialog.dialog("close");
        });
    };

    init = function ($container, imgSrc) {
        stateMap.imgSrc = imgSrc;
        var $img = $(configMap.main_html);
        $img.attr("src", imgSrc);
        $container.append($img);
        setJqueryMap($container);
        jqueryMap.$dialog.dialog(configMap.dialog_option);
        $container.on("click", ".edit-photo-btn", onEditPhotoBtnClick);
        jqueryMap.$dialog.on("click", ".okBtn", onOkBtnClick);
        $("#bigHeadPhotoFile").change(onBigHeadPhotoFileChange).click(function () {
            $(this).val("");
        });
        //$("body").on("change", "#bigHeadPhotoFile", onBigHeadPhotoFileChange);
        //$("body").on("click", "#bigHeadPhotoFile", function () {
        //    $(this).val("");
        //});
    };
    return {
        init: init
    }
})();