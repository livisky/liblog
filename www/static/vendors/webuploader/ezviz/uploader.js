(function(global,factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory(global, $);
        });
    } else if (typeof define === 'function' && define.cmd) {
        define(['jquery'],function(require){
            return factory(global, $);
        });
    } else {
        factory(global, global.jQuery || global.Zepto);
    }
}(typeof window !== 'undefined'? window: this,function(global,$) {
    (function ($) {
        var settings = {
            fileType: {
                img: ['jpg', 'jpeg', 'gif', 'png'],
                zip: ['zip', 'rar', '7zip'],
                md:['md'],
                img2: ['jpg', 'jpeg', 'gif', 'png', 'bmp']
            },
            maxSize: 10 * 1024 * 1024,
            url: 'http://test.fs.base.shipin7.com/upload.php',
            success: function () { },
            error: function (code, xhr, status, error) { }//code: 1代表没有选择文件，2代表filetype不存在于配置中，3代表选择的文件类型不对, 4代表长度不对，5代表上传错误, 6代表iframe上传失败
        };

        var feature = {};
        feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
        feature.formdata = window.FormData !== undefined;

        $.fn.extend({
            upload: function (options) {
                options = $.extend(settings, options);
                var $this = $(this);
                function valFileType() {
                    var path = $this[0].value;
                    if (path) {
                        var ext = path.split('.').pop();
                        var fileType = $this.attr('filetype');
                        if (fileType) {//无filetype属性代表所有类型均可
                            var exts = options.fileType[fileType];
                            if (exts) {//检查是否存在对应的文件类型
                                var result = false;
                                for (var i = 0; i < exts.length; i++) {
                                    if (exts[i] == ext) {
                                        result = true;
                                        break;
                                    }
                                }

                                if (!result) {
                                    options.error && options.error(3, undefined, undefined, '选择的文件类型不正确');
                                    return false;
                                }
                            } else {
                                options.error && options.error(2, undefined, undefined, '指定的filetype不存在，请在options里指定');
                                return false;
                            }
                        }
                    } else {
                        options.error && options.error(1, undefined, undefined, '请选择一个文件');
                        return false;
                    }

                    return true;
                }

                function valFileLength() {
                    if ($this[0].files) {//IE below version 9 doesn't support multiple file upload
                        var currentSize = $this[0].files[0].size;
                        var limitSize = options.maxSize;

                        if (currentSize == 0) {
                            options.error && options.error(4, undefined, undefined, '该文件未包含任何信息');
                            return false;
                        }
                        else if (limitSize > 0) {//小于零代表不作限制
                            if (currentSize > limitSize) {
                                options.error && options.error(4, undefined, undefined, '文件大小超过限制长度');
                                return false;
                            }
                        }
                    }

                    return true;
                }
                var fileAPI = feature.fileapi && feature.formdata;

                var shouldUseFrame = !fileAPI;
                if (shouldUseFrame) {
                    var success = options.success;
                    var error = options.error;
                    function registerMessageMonitor() {
                        if (window.addEventListener) {
                            addEventListener("message", listener, false)
                        } else {
                            attachEvent("onmessage", listener)
                        }
                    }

                    function clearMessageMonitor() {
                        if (window.addEventListener) {
                            removeEventListener("message", listener, false)
                        } else {
                            detachEvent("onmessage", listener)
                        }
                    }

                    function listener(event) {
                        if ($.isFunction(success)) {
                            success(event.data);
                        }
                    }

                    //覆盖原先的callback
                    options.success = clearMessageMonitor;
                    options.error = function (code, xhr, status, error, form) {
                        clearMessageMonitor();
                        if ($.isFunction(error)) {
                            error(6, xhr, status, error, form);
                        }
                    };

                    registerMessageMonitor();

                    var form = $this.closest('form');
                    form.remove('input[name=XHR_CORS_TARGETORIGIN]').append('<input type="hidden" name="XHR_CORS_TARGETORIGIN" value="' + window.location.href + '">');
                }
                if (valFileType() && valFileLength()) {
                    var opts = {
                        type: 'POST'
                    }
                    opts = $.extend(opts, options);
                    opts.error = function (xhr, status, error, form) { options.error && options.error(5, xhr, status, error, form) };
                    $this.closest('form').ajaxSubmit(opts);
                }
            }
        });
    })($);
}));
