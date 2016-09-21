'use strict';
let Create = {};
import fs from 'fs';
import path from 'path';
import Base from './base.js';
/**
 * 生成xml地图
 * @param  {object} data 数据包 {article: [], list: [], search: []}
 */
Create.createXml = function(data) {

    let arr = [];
    // let now = think.datatime(new Date(), 'yyyy-MM-dd');
    let now = think.datetime(new Date(),'YYYY-MM-DD')
    arr.push('<?xml version="1.0" encoding="UTF-8"?>');
    arr.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');


    // 添加主页
    arr.push('<url>');
    arr.push('<loc>' + data.homeurl + '</loc>');
    arr.push('<lastmod>' + now + '</lastmod>');
    arr.push('<changefreq>always</changefreq>');
    arr.push('<priority>1.0</priority>');
    arr.push('</url>');

    //添加列表
    // console.log(data.list);
    data.list.forEach(function(val) {
        arr.push('<url>');
        arr.push('<loc>' + data.homeurl + 'category/'+ (val.id) +'.html' + '</loc>');
        arr.push('<lastmod>' + now + '</lastmod>');
        arr.push('<changefreq>always</changefreq>');
        arr.push('<priority>0.9</priority>');
        arr.push('</url>');
    });

    //添加文章
    data.article.forEach(function(val) {
        arr.push('<url>');
        arr.push('<loc>' + data.homeurl + 'page/'+ val.id +'.html' + '</loc>');
        arr.push('<lastmod>' + think.datetime(val.createtime,'YYYY-MM-DD') + '</lastmod>');
        arr.push('<changefreq>always</changefreq>');
        arr.push('<priority>0.8</priority>');
        arr.push('</url>');
    });

    //添加主题
    data.topic.forEach(function(val) {
        arr.push('<url>');
        arr.push('<loc>' + data.homeurl + 'topic/item/'+ val.id +'.html' + '</loc>');
        arr.push('<lastmod>' + think.datetime(val.updatetime,'YYYY-MM-DD') + '</lastmod>');
        arr.push('<changefreq>always</changefreq>');
        arr.push('<priority>0.8</priority>');
        arr.push('</url>');
    });

    //添加个人主页
    data.user.forEach(function(val) {
        arr.push('<url>');
        arr.push('<loc>' + data.homeurl + 'personal/@'+ val.name + '</loc>');
        arr.push('<lastmod>' + think.datetime(val.createtime,'YYYY-MM-DD') + '</lastmod>');
        arr.push('<changefreq>always</changefreq>');
        arr.push('<priority>0.8</priority>');
        arr.push('</url>');
    });

    //添加其他页面
   data.others.forEach(function(val) {
        arr.push('<url>');
        arr.push('<loc>' + data.homeurl + val.url + '</loc>');
        arr.push('<lastmod>' + now + '</lastmod>');
        arr.push('<changefreq>always</changefreq>');
        arr.push('<priority>0.8</priority>');
        arr.push('</url>');
    });

    arr.push('</urlset>');
    fs.writeFileSync(path.resolve(think.ROOT_PATH, './www/sitemap.xml'), arr.join('\n'));
}
export default Create;
