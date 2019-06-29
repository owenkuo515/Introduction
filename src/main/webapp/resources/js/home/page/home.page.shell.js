home.page.shell = (function () {
    var configMap = {
        main_html: '' +
        '<div class="first-page page"></div>' +
        '<div class="second-page page"></div>',
        title_html: '<div class="title-container">' +
        '<div class="title"></div>' +
        '<div class="underline"></div>' +
        '</div>'
    }, stateMap = {}, jqueryMap = {
        $container: null,
        $firstPage:null
    }, setJqueryMap, init, buildTitleContainer;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$firstPage = $container.find(".first-page")
    };
    buildTitleContainer = function (name) {
        var $titleContainer = $(configMap.title_html);
        $titleContainer.find(".title").html(name);
        return $titleContainer;
    };
    init = function ($container) {
        $container.html(configMap.main_html);
        setJqueryMap($container);
        home.page.part.init(jqueryMap.$firstPage);
    };
    return {
        init: init,
        buildTitleContainer:buildTitleContainer

    }
})();