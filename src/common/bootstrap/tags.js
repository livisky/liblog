/**
置顶文章列表
{% article data = "topList",limit= "6",flag="totop"%}
站长推荐
{% article data = "torecomList",limit= "6",flag="torecom"%}
图文推荐
{% article data = "picrecomList",limit= "6",flag="topicrecom"%}
*/
global.article = function(){
    this.tags = ['article'];
    this.parse = function (parser, nodes, lexer) {
        let tok = parser.nextToken();
        let args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args);
    };
    this.run = async function (context, args, callback) {
        let where = {'ispublished':1};
        let data = think.isEmpty(args.data) ? "data" : args.data;
        let limit = think.isEmpty(args.limit) ? "10" : args.limit;

				//分类item
        let cid = think.isEmpty(args.cid) ? false :{'item':['=',args.cid]};
        if(cid){
            where = think.extend({},where,cid);
        }
				//标签tag
        let tid = think.isEmpty(args.tid) ? false :{'tag':['=',args.tid]};
        if(tid){
            where = think.extend({},where,tid);
        }
				//标签flag
				// 置顶:flag="torecom",站长推荐:flag="torecom",图文推荐:flag="topicrecom",
				let flag = think.isEmpty(args.flag) ? false :{[args.flag]: 1};
				if(flag){
						where = think.extend({},where,flag);
				}

        // order by
        let type='createtime DESC';
        if(!think.isEmpty(args.type)){
            if(args.type=="hot"){
              type="view DESC"
            }
        }

        let article = await think.model('article', think.config("db")).where(where).limit(limit).order(type).select();

        context.ctx[data] = article;
        return callback(null, '');
    }
}

/**
8条最新主题帖
{% topic data = "topicList",limit= "8"%}

8条最热题帖
{% topic data = "topicList",limit= "8",type="hot" %}

*/


global.topic = function(){
    this.tags = ['topic'];
    this.parse = function (parser, nodes, lexer) {
        let tok = parser.nextToken();
        let args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args);
    };
    this.run = async function (context, args, callback) {
        let where = {};
        let data = think.isEmpty(args.data) ? "data" : args.data;
        let limit = think.isEmpty(args.limit) ? "10" : args.limit;

				//主题分类item
        let item = think.isEmpty(args.item) ? false :{'item':['=',args.item]};
        if(item){
            where = think.extend({},where,item);
        }

        // order by
        let type='mytime DESC';
        if(!think.isEmpty(args.type)){
            if(args.type=="hot"){
              type="view DESC"
            }
        }

        let topic = await think.model('topic', think.config("db")).field("*,li_topic.id as tid,li_topic.createtime as mytime").join({
             user: {on: "author,name"},
             topic_item:{on:"item,name"}
         }).where(where).limit(limit).order(type).select();
        //

        context.ctx[data] = topic;
        return callback(null, '');
    }
}
