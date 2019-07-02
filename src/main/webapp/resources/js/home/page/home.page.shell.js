home.page.shell = (function () {
    var configMap = {
        main_html: '',
        title_html: '<div class="title-container">' +
        '<div class="title"></div>' +
        '<div class="underline"></div>' +
        '</div>'
    }, stateMap = {}, jqueryMap = {
        $container: null,
        $firstPage: null
    }, setJqueryMap, init, buildTitleContainer;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };
    buildTitleContainer = function (name) {
        var $titleContainer = $(configMap.title_html);
        $titleContainer.find(".title").html(name);
        return $titleContainer;
    };
    init = function ($container) {
        $container.html(configMap.main_html);
        setJqueryMap($container);
        home.page.part.init($container);
    };
    return {
        init: init,
        buildTitleContainer: buildTitleContainer

    }
})();