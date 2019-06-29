home.page.part = (function () {
    var configMap = {
        main_html: '',
        part_html: '<div class="part-container"></div>',
        contentContainer_html: '<div class="content-container"></div>',
        leftPart_html: '<div class="left-part"></div>',
        rightPart_html: '<div class="right-part"></div>',
        content_html: '<div class="content">' +
        '<div class="content-key"></div>' +
        '<span class="colon">：</span>' +
        '<div class="content-value"></div>' +
        '<div class="delete">X</div>' +
        '</div>',
        img_html: '<img class="img" />',
        addListContentIcon_html: '<div class="addListContentIcon">+</div>',
        addListContent_html: '<div class="addListContent-container">' +
        '<input class="content-key-input"/><span class="colon">：</span><input class="content-value-input"/>' +
        '<button class="ok-btn">確定</button><button class="cancel-btn">取消</button>' +
        '</div>',
        addListContent_url: '/rest/listContent/addOne/',
        deleteListContent_url: '/rest/listContent/'
    }, stateMap = {}, jqueryMap = {
        $container: null
    }, setJqueryMap, init, buildPart, buildContentContainer, renderListContent, onDeleteClick, onAddListContentClick, onCancelClick, onOkClick, buildListContent;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };
    buildListContent = function (content) {
        var $content = $(configMap.content_html);
        $content.data("data", content);
        $content.find(".content-key").html(content.contentKey);
        $content.find(".content-value").html(content.value);
        return $content;
    };
    renderListContent = function (resumeData, $container) {
        resumeData.listContents.forEach(function (content) {
            $container.append(buildListContent(content));
        });
        $container.append(configMap.addListContentIcon_html);
    };

    buildContentContainer = function (resumeData) {
        var $contentContainer = $(configMap.contentContainer_html);
        var $leftPart = $(configMap.leftPart_html);
        var $rightPart = $(configMap.rightPart_html);
        renderListContent(resumeData, $leftPart);
        home.page.bigHeadPhoto.init($rightPart, resumeData.img);
        $contentContainer.append($leftPart);
        $contentContainer.append($rightPart);
        return $contentContainer;
    };
    buildPart = function (resumeData) {
        var $partContainer = $(configMap.part_html);
        $partContainer.append(home.page.shell.buildTitleContainer(resumeData.name));
        $partContainer.append(buildContentContainer(resumeData));
        return $partContainer;
    };
    onDeleteClick = function () {
        var $content = $(this).parents(".content");
        var content = $content.data("data");
        if (confirm("確定要刪除\"" + content.contentKey + "\"嗎?")) {
            $.del(configMap.deleteListContent_url + content.id, function () {
                $content.remove();
            })
        }
    };
    onAddListContentClick = function () {
        var $leftPart = jqueryMap.$container.find(".left-part");
        if ($leftPart.find(".addListContent-container").length == 0) {
            var $addListContentContainer = $(configMap.addListContent_html);
            $leftPart.find(".addListContentIcon").before($addListContentContainer);
        }
    };
    onCancelClick = function () {
        $(this).parents(".addListContent-container").remove();
    };
    onOkClick = function () {
        var $this = $(this);
        var $addListContentContainer = $this.parents(".addListContent-container");
        var contentKey = $addListContentContainer.find(".content-key-input").val();
        var contentValue = $addListContentContainer.find(".content-value-input").val();
        if (contentKey.length === 0 || contentValue.length === 0) {
            alert("請填入輸入框內容");
        } else {
            var data = {
                contentKey: contentKey,
                value: contentValue
            };
            var resumeId = home.shell.getResumeData().id;
            $.add(configMap.addListContent_url + resumeId, data).then(function (response) {
                var $content = buildListContent(response.data);
                $addListContentContainer.before($content);
                $addListContentContainer.remove();
            })
        }
    };

    init = function ($container) {
        setJqueryMap($container);
        $container.append(buildPart(home.shell.getResumeData()));
        home.page.staticPart.render($container);
        $container.on("click", ".left-part .content .delete", onDeleteClick);
        $container.on("click", ".left-part .addListContentIcon", onAddListContentClick);
        $container.on("click", ".left-part .addListContent-container .ok-btn", onOkClick);
        $container.on("click", ".left-part .addListContent-container .cancel-btn", onCancelClick);
    };
    return {
        init: init
    }
})();