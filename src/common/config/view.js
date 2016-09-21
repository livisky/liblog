'use strict';
/**
 * template config
 */
export default {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    nunjucks: {
      prerender: (nunjucks, env) => {
          //截取字符串
          env.addFilter('shorten', function(str, count) {
              return str.slice(0, count || 5);
          });
          env.addFilter('tagname', function(str) {
              if(str=='job'){
                return '招聘';
              }else if(str=='share'){
                return '分享';
              }else if(str=='ask'){
                return '问答';
              }else if(str=='liblog'){
                return 'liblog';
              }else if(str=='wangeditor'){
                return 'wangeditor';
              }else if(str=='thinkjs'){
                return 'thinkjs';
              }
          });
          env.addExtension('article', new article(), true);
          env.addExtension('topic', new topic(), true);
      }
    }
  }
};
