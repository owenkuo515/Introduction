home.shell = (function () {
    var configMap = {
        main_html: '<div class="banner-container"><div class="title">履歷表</div></div>'
    }, stateMap = {}, jqueryMap = {
        $container: null
    }, setJqueryMap, init;

    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };
    init = function ($container) {
        $container.html(configMap.main_html)
    };
    return {
        init: init
    }

})();
