home.page.firstPage = (function () {
    var configMap = {
        main_html: '<div class="first-page page"></div>',
        part_html:'<div class="part-container"></div>',
        title_html:'<div class="title-container"></div>',
        content_html:'<div class="content-container"></div>'
    }, stateMap = {}, jqueryMap = {
        $container: null
    }, setJqueryMap, init, buildPart, buildTitleContainer, buildContentContainer;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };
    buildTitleContainer = function(){

    };
    buildContentContainer = function(){

    };
    buildPart = function(resumeData){
        console.log(resumeData)
        var $partContainer = $(configMap.part_html);
        $partContainer.append(buildTitleContainer());
        $partContainer.append(buildContentContainer());
        return $partContainer;
    };
    init = function ($container) {
        $container.html(configMap.main_html);
        setJqueryMap($container);
        buildPart(home.shell.getResumeData());
    };
    return {
        init: init
    }
})();