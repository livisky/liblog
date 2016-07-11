
define(function(){

    var fn={};
    fn.doajax=function(config,fn){
          $.ajax({
              url:config.url,
              data:config.data,
              type:config.type,
              success:fn
          })
    }

    return fn;
})
