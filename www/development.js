var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
    APP_PATH: rootPath + path.sep + 'app',
    RUNTIME_PATH: rootPath + path.sep + 'runtime',
    ROOT_PATH: rootPath,
    Dev_Src: 'src/',
    Modules_Src: 'modules_src',
    UPLOAD_PATH: __dirname + "/static/upload", // 定义文件上传的目录
    THEME_PATH: __dirname + path.sep + "static" + path.sep + "theme",
    env: 'development'
});

//compile src/ to app/
instance.compile({
    retainLines: true,
    log: true
});

instance.run();