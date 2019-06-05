home.page.shell = (function () {
    var configMap = {
        main_html: '' +
        '<div class="first-page page"></div>' +
        '<div class="second-page page"></div>'
    }, stateMap = {}, jqueryMap = {
        $container: null,
        $firstPage:null
    }, setJqueryMap, init;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$firstPage = $container.find(".first-page")
    };
    init = function ($container) {
        $container.html(configMap.main_html);
        setJqueryMap($container);
        home.page.part.init(jqueryMap.$firstPage);
    };
    return {
        init: init
    }
})();