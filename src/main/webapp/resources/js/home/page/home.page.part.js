home.page.part = (function () {
    var configMap = {
        main_html: '',
        part_html: '<div class="part-container"></div>',
        title_html: '<div class="title-container">' +
        '<div class="title"></div>' +
        '<div class="underline"></div>' +
        '</div>',
        contentContainer_html: '<div class="content-container"></div>',
        leftPart_html: '<div class="left-part"></div>',
        rightPart_html: '<div class="right-part"></div>',
        content_html: '<div class="content">' +
        '<div class="content-key"></div>' +
        '<span class="colon">：</span>' +
        '<div class="content-value"></div>' +
        '</div>',
        img_html:'<img class="img" />'
    }, stateMap = {}, jqueryMap = {
        $container: null
    }, setJqueryMap, init, buildPart, buildTitleContainer, buildContentContainer, buildListContent, renderListContent, renderImg;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };
    buildTitleContainer = function (resumeData) {
        var $titleContainer = $(configMap.title_html);
        $titleContainer.find(".title").html(resumeData.name);
        return $titleContainer;
    };
    renderListContent = function (resumeData, $container) {
        resumeData.listContents.forEach(function (content) {
            var $content = $(configMap.content_html);
            $content.find(".content-key").html(content.contentKey);
            $content.find(".content-value").html(content.value);
            $container.append($content);
        });
    };

    buildContentContainer = function (resumeData) {
        var $contentContainer = $(configMap.contentContainer_html);
        var $leftPart = $(configMap.leftPart_html);
        var $rightPart = $(configMap.rightPart_html);
        renderListContent(resumeData, $leftPart);
        home.page.bigHeadPhoto.init($rightPart,resumeData.img);
        $contentContainer.append($leftPart);
        $contentContainer.append($rightPart);
        return $contentContainer;
    };
    buildPart = function (resumeData) {
        var $partContainer = $(configMap.part_html);
        $partContainer.append(buildTitleContainer(resumeData));
        $partContainer.append(buildContentContainer(resumeData));
        return $partContainer;
    };
    init = function ($container) {
        setJqueryMap($container);
        $container.append(buildPart(home.shell.getResumeData()))
    };
    return {
        init: init
    }
})();