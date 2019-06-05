var imgCut = {};
/**
 * Created by cheng.wei
 * on 2019/2/21.
 */
imgCut.shell = function () {
    var configMap = {
        main_html: '<img />'
    },
        jqueryMap = {
        $imgAreaSelect: null
    },
        stateMap = {
        narrowDownPercent: 0
    },
        init;
    init = function init($container, opt) {
        $container.addClass("Module_imgCut");
        var containerWidth = $container.width();
        var containerHeight = $container.height();
        var aspectRatioWidth = containerWidth;
        var aspectRatioHeight = containerHeight;
        //預設比例用外框的比例
        if (opt.selectionWidthRatio && opt.selectionHeightRatio) {
            aspectRatioWidth = opt.selectionWidthRatio;
            aspectRatioHeight = opt.selectionHeightRatio;
        }
        var aspectRatio = aspectRatioWidth + ":" + aspectRatioHeight;

        var $img = $(configMap.main_html);
        $container.html($img);
        $img.on("load", function () {
            var imgRealWidth = $img.width();
            var imgRealHeight = $img.height();
            var isContainerBiggerThanImage = containerWidth >= imgRealWidth && containerHeight >= imgRealHeight;
            //如果外框比圖片大則不改變圖片大小
            if (!isContainerBiggerThanImage) {
                if (imgRealWidth / containerWidth >= imgRealHeight / containerHeight) {
                    $img.width(containerWidth);
                    //去掉小數點可能會有一點點誤差，但是後面運算比較準
                    $img.height(Math.floor($img.height()));
                } else {
                    $img.height(containerHeight);
                    //去掉小數點可能會有一點點誤差，但是後面運算比較準
                    $img.width(Math.floor($img.width()));
                }
            }
            var afterChangeImgWidth = $img.width();
            var afterChangeImgHeight = $img.height();
            if (afterChangeImgWidth < imgRealWidth) {
                stateMap.narrowDownPercent = afterChangeImgWidth / imgRealWidth;
            }
            var x1, y1, x2, y2, diff;
            //拿圖片寬度為基準算出裁減框的高，若高度小於圖片高，則裁減框最大是頂到圖片的左右，上下置中
            var selectionHeight = afterChangeImgWidth / aspectRatioWidth * aspectRatioHeight;
            if (selectionHeight <= afterChangeImgHeight) {
                diff = (afterChangeImgHeight - selectionHeight) / 2;
                x1 = 0;
                y1 = diff;
                x2 = afterChangeImgWidth;
                y2 = selectionHeight + diff;
            } else {
                //若裁減框高度大於圖片高度，則裁減框最大是頂到圖片上下，左右置中
                var selectionWidth = afterChangeImgHeight / aspectRatioHeight * aspectRatioWidth;
                diff = (afterChangeImgWidth - selectionWidth) / 2;
                x1 = diff;
                y1 = 0;
                x2 = selectionWidth + diff;
                y2 = afterChangeImgHeight;
            }
            //若x2、y2有小數點會有bug，裁減框尺寸不知道為啥會多1，所以要-1回去
            jqueryMap.$imgAreaSelect = $img.imgAreaSelect({
                aspectRatio: aspectRatio,
                handles: true,
                instance: true,
                parent: $container,
                persistent: true,
                x1: x1, y1: y1, x2: Math.floor(x2) - 1, y2: Math.floor(y2) - 1
            });
        });
        $img.attr("src", opt.src);
    };
    return {
        init: init,
        getSelection: function getSelection() {
            return jqueryMap.$imgAreaSelect.getSelection();
        },
        getNarrowDownPercent: function getNarrowDownPercent() {
            return stateMap.narrowDownPercent;
        }
    };
};
var Module_imgCut = imgCut.shell;
