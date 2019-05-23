/**
 * Created by Owen
 * on 2017/12/30.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require("glob");
var basePath = "src/main/webapp/resources";
module.exports = {
    entry: { //進入點
        home:glob.sync("./src/main/webapp/resources/css/home/**/!(_*)*.scss"),
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/webpack'
    },
    module: {
        // 加入 Loader
        rules: [{
            test: /\.(scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        }]
    },
    plugins: [
        // 指定產生檔案名稱與路徑
        new ExtractTextPlugin({
            filename:'../'+basePath+'/css/[name]/main.css'
        })
    ]
};