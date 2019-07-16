home.shell = (function () {
    var configMap = {
        main_html: '<div class="banner-container"><div class="title">履歷表</div></div>' +
        '<div class="btn-container"><button class="download-pdf-btn">匯出PDF</button>' +
        '<button style="margin: 0 10px" class="reset-btn">恢復預設</button><div style="display: inline-block;vertical-align: sub">請盡量操作任何功能。</div></div>' +
        '</div>' +
        '<div class="page-container"></div>',
        getResume_url: '/rest/resume/'
    }, stateMap = {
        resumeData: null
    }, jqueryMap = {
        $container: null,
        $pageContainer: null
    }, setJqueryMap, init, getData, onDownloadPdfClick, initResume;

    getData = function () {
        return $.get(configMap.getResume_url);
    };
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$pageContainer = $container.find(".page-container");
    };
    onDownloadPdfClick = function () {
        var $cloneHtml = jqueryMap.$pageContainer.clone(true);
        $cloneHtml.find(".addListContentIcon,.edit-photo-btn").remove();
        var html = $cloneHtml[0].outerHTML;
        var fileName = stateMap.resumeData.name + ".pdf";
        var url = '/rest/pdf/';
        var requestBody = JSON.stringify({
            html: html,
            fileName: fileName
        });

        $.ajax({
            method: 'POST',
            url: url,
            data: requestBody,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            dataType: "json"
        }).then(function (response) {
            //var url = "http://localhost:9090/pdf/downloadPdf?fileName=" + response.data.fileName;
            var url = "http://intro.southeastasia.cloudapp.azure.com:9090/pdf/downloadPdf?fileName=" + response.data.fileName;
            window.open(url);
        });

    };
    initResume = function (resumeData) {
        stateMap.resumeData = resumeData;
        home.page.shell.init(jqueryMap.$pageContainer);
    };
    init = function ($container) {
        $container.html(configMap.main_html);
        setJqueryMap($container);
        getData().then(function (response) {
            initResume(response.data);
        });
        $container.on("click", ".download-pdf-btn", onDownloadPdfClick);
        $container.on("click", ".reset-btn", function () {
            $.get("/rest/resume/reset").then(function (response) {
                initResume(response.data);
            });
        });

    };
    return {
        init: init,
        getResumeData: function () {
            return stateMap.resumeData;
        }
    }

})();
