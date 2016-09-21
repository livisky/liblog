'use strict';

import Base from './base.js';

export default class extends Base {


    async indexAction(){

        //var nodemailer  = require("nodemailer");
        //var smtpTransport = nodemailer.createTransport("SMTP", {
        //    service: "QQ",
        //    auth: {
        //        user: "262248861@qq.com", // 账号
        //        pass: "wvebvwxcsxpebiai" // 密码
        //    }
        //});
        //smtpTransport.sendMail({
        //    from: '262248861@qq.com',
        //      to: "390039626@qq.com,livisky@163.com", // 收件列表
        //subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件',
        //    html: 'This is a test mail,please do not reply it! <br> '
        //},function(err, res) {
        //    console.log(err, res);
        //});

        var nodemailer  = require("nodemailer");
        let mailer=think.config("mail");
        var smtpTransport = nodemailer.createTransport("SMTP", {
            host: mailer.host,
            secureConnection: false,
            port: mailer.port,
            requiresAuth: true,
            domains: mailer.domains,
            auth: {
                user: mailer.account, // 账号
                pass: mailer.pass // 密码
            }
        });
        smtpTransport.sendMail({
            from: mailer.account,
            to: "390039626@qq.com,livisky@163.com", // 收件列表
        subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件',
            html: 'have a try!'
        },function(err, res) {
            console.log(err, res);
        });
        this.assign("title","测试邮件");
        return this.display();
    }
}