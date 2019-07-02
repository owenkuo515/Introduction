home.shell = (function () {
    var configMap = {
        main_html: '<div class="banner-container"><div class="title">履歷表</div></div>' +
        '<div class="btn-container"><button class="download-pdf-btn">匯出PDF</button></div>' +
        '<div class="page-container"></div>',
        getResume_url: '/rest/resume/'
    }, stateMap = {
        resumeData: null
    }, jqueryMap = {
        $container: null,
        $pageContainer: null
    }, setJqueryMap, init, getData, onDownloadPdfClick;

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
        var html=$cloneHtml[0].outerHTML;
        var fileName = stateMap.resumeData.name + ".pdf";
        var url = '/rest/pdf/';
        var requestBody = JSON.stringify({
                html:html,
                fileName:fileName
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
            var url = "http://localhost:9090/pdf/downloadPdf?fileName=" + response.data.fileName;
            window.open(url);
        });

    };
    init = function ($container) {
        getData().then(function (response) {
            stateMap.resumeData = response.data;
            $container.html(configMap.main_html);
            setJqueryMap($container);
            home.page.shell.init(jqueryMap.$pageContainer);
        });
        $container.on("click", ".download-pdf-btn", onDownloadPdfClick);
    };
    return {
        init: init,
        getResumeData: function () {
            return stateMap.resumeData;
        }
    }

})();
