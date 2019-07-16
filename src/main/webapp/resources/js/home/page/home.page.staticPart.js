home.page.staticPart = (function () {
    var configMap = {
        main_html: '<div class="static-part experience"></div>' +
        '<div class="static-part professional-skill"></div>' +
        '<div class="static-part work-experience"></div>' +
        '<div class="static-part special-experience"></div>' +
        '<div class="static-part works"></div>',
        experience_html:'<div class="content-container">' +
        '<div class="content">最高學歷：龍華科技大學機械工程系</div>' +
        '<div class="content">2013年6月 (畢業)</div>' +
        '<div class="content">專業職訓：資策會Java程式設計師就業養成班</div>' +
        '<div class="content">2016/11/14~2017/04/28  (結業)</div>' +
        '</div>',
        professionalSkill_html:'<div class="content-container">' +
        '<div class="content">前端：JavaScript、jQuery、Karma、Jasmine、Webpack、Grunt、Scss</div>' +
        '<div class="content">後端：Java、Spring、Spring Boot、Junit、Restful</div>' +
        '<div class="content">資料庫：MsSql、MySql</div>' +
        '</div>',
        workExperience_html:'<div class="content-container">' +
        '<div class="content-title">英丰寶資訊股份有限公司	( 2017/05～ 2019/05)</div>' +
        '<div class="content">擔任全端工程師，針對產品、專案做開發、修改、擴充。</div>' +
        '<div class="content">曾參與專案及參與部分：</div>' +
        '<div class="content">全端</div>' +
        '<ul>' +
        '<li>多個問卷系統擴充案 (jQuery，Java)</li>' +
        '<li>健康管理系統 (Java、jQuery)</li>' +
        '<li>獨立規劃開發前端模組開發系統 (Java、Grunt)</li>' +
        '</ul>' +
        '<div class="content">後端</div>' +
        '<ul>' +
        '<li>Excel匯入功能 (Java)</li>' +
        '<li>審核系統 (Java)</li>' +
        '</ul>' +
        '<div class="content">前端</div>' +
        '<ul>' +
        '<li>HTML轉PDF功能 (jQuery、NodeJs)</li>' +
        '<li>問卷系統形象網站 (jQuery)</li>' +
        '</ul>' +
        '<div class="content">專案對外窗口</div>' +
        '<ul>' +
        '<li>問卷系統</li>' +
        '</ul>' +
        '</div>',
        specialExperience_html:'<div class="content-container">' +
        '<div>重大漏洞</div>' +
        '<ul>' +
        '<li>' +
        '<div class="content">伺服器卡住沒回應</div>' +
        '<div class="content">處理：增加請求數量，用排程處理非必要即時刪除之資料</div>' +
        '</li>' +
        '<li>' +
        '<div class="content">死結</div>' +
        '<div class="content">處理：建立索引以避免死結</div>' +
        '</li>' +
        '</ul>' +
        '<div>特殊客製需求</div>' +
        '<ul>' +
        '<li>Excel跨分頁及同頁之一對多關係匯入</li>' +
        '<li>匯出PDF時內容自動分頁，500頁匯出時間只需約90秒</li>' +
        '<li>前端模組開發系統：可從內部網站看到各模組，以便挑選各專案合適之模組</li>' +
        '</ul>' +
        '</div>',
        works_html:'<div class="content-container">' +
        '<ul>' +
        '<li><div class="title"><div style="font-size: 20px">Web 履歷表</div><a style="margin-bottom: 5px;display: inline-block" href="http://intro.southeastasia.cloudapp.azure.com/">http://intro.southeastasia.cloudapp.azure.com/</a></div>' +
        '<div>使用之技術：</div>' +
        '<ul class="first-child">' +
        '<li>前端：jQuery、Webpack、Scss</li>' +
        '<li>後端：Java、Spring Boot、Restful</li>' +
        '<li>資料庫：Microsoft SQL Server</li>' +
        '</ul>' +
        '<div>功能：</div>' +
        '<ul class="second-child">' +
        '<li>上傳大頭照支援圖片裁切</li>' +
        '<li>個人資料新增與刪除</li>' +
        '<li>匯出PDF</li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>'
    }, stateMap = {}, jqueryMap = {
        $container: null,
        $experience: null,
        $professionalSkill: null,
        $workExperience: null,
        $specialExperience: null,
        $works: null
    }, setJqueryMap, render, renderWorksPart, renderExperiencePart, renderProfessionalSkillPart, renderWorkExperiencePart, renderSpecialExperiencePart;
    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$experience = $container.find(".experience");
        jqueryMap.$professionalSkill = $container.find(".professional-skill");
        jqueryMap.$workExperience = $container.find(".work-experience");
        jqueryMap.$specialExperience = $container.find(".special-experience");
        jqueryMap.$works = $container.find(".works");
    };
    renderExperiencePart = function () {
        jqueryMap.$experience.append(home.page.shell.buildTitleContainer("學經歷"));
        jqueryMap.$experience.append(configMap.experience_html);
    };
    renderProfessionalSkillPart = function () {
        jqueryMap.$professionalSkill.append(home.page.shell.buildTitleContainer("專業技能"));
        jqueryMap.$professionalSkill.append(configMap.professionalSkill_html);
    };
    renderWorkExperiencePart = function () {
        jqueryMap.$workExperience.append(home.page.shell.buildTitleContainer("工作經歷"));
        jqueryMap.$workExperience.append(configMap.workExperience_html);
    };
    renderSpecialExperiencePart = function () {
        jqueryMap.$specialExperience.append(home.page.shell.buildTitleContainer("特殊經驗"));
        jqueryMap.$specialExperience.append(configMap.specialExperience_html);
    };
    renderWorksPart = function () {
        jqueryMap.$works.append(home.page.shell.buildTitleContainer("作品"));
        jqueryMap.$works.append(configMap.works_html);
    };
    render = function ($container) {
        $container.append(configMap.main_html);
        setJqueryMap($container);
        renderExperiencePart();
        renderProfessionalSkillPart();
        renderWorkExperiencePart();
        renderSpecialExperiencePart();
        renderWorksPart();
    };
    return {
        render: render
    }
})();