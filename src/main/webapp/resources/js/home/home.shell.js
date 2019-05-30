home.shell = (function () {
    var configMap = {
        main_html: '<div class="banner-container"><div class="title">履歷表</div></div>' +
        '<div class="page-container"></div>',
        getResume_url: '/rest/resume/'
    }, stateMap = {
        resumeData: null
    }, jqueryMap = {
        $container: null,
        $pageContainer: null
    }, setJqueryMap, init, getData;

    getData = function () {
        return $.get(configMap.getResume_url);
    };
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$pageContainer = $container.find(".page-container");
    };
    init = function ($container) {
        getData().then(function (response) {
            stateMap.resumeData = response.data;
            $container.html(configMap.main_html);
            setJqueryMap($container);
            home.page.shell.init(jqueryMap.$pageContainer);
        });
    };
    return {
        init: init,
        getResumeData: function () {
            return stateMap.resumeData;
        }
    }

})();
