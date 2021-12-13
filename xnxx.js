// Xnxx Download Whatsapp Bot
let XNXXDL = require('xnxx-dl-wa');let xnxxconfig = XNXXDL.xnxxconfig; let GBLACK =require('blocked-s/grp') ;let XnxxHub = XNXXDL.XnxxHub
let fs = require('fs'); let os = require('os'); let got = require('got'); let path = require("path"); let chalk = require('chalk');
let {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');  
let {Message, StringSession, Image, Video} =  require('xnxx-dl-wa/Wa-Base/');let { DataTypes } = require('sequelize');let Heroku = require('heroku-client');
let heroku = new Heroku({ token: xnxxconfig.HEROKU.API_KEY}); let baseURI = '/apps/' + xnxxconfig.HEROKU.APP_NAME;
let XnxxWaBotDB = xnxxconfig.DATABASE.define('XnxxWaBot', {info: {type: DataTypes.STRING,allowNull: false},value: {type: DataTypes.TEXT,allowNull: false}});
fs.readdirSync('./xnxxDb/').forEach(cmdall => { if (path.extname(cmdall).toLowerCase() == '.js') {require('./xnxxDb/' + cmdall)}});let Commandsdb = require('./xnxxDb/database');
String.prototype.format = function () {var i = 0,args = arguments;return this.replace(/{}/g, function () {return typeof args[i] != 'undefined' ? args[i++] : '';})};
if (!Date.now) {Date.now = function () {return new Date().getTime();}}
Array.prototype.remove = function () {var what, a = arguments,L = a.length,ax; while (L && this.length) {what = a[--L];while ((ax = this.indexOf(what)) !== -1) {this.splice(ax, 1);}}; return this;};
async function xnxxWaBot() {
        const webxnx = await XnxxHub.webxnxx();await xnxxconfig.DATABASE.sync();var StrSes_Db = await XnxxWaBotDB.findAll({where: {info: 'StringSession'}});
        const XnxxData = new WAConnection();XnxxData.version = webxnx;let Session = new StringSession();XnxxData.logger.level = xnxxconfig.DEBUG ? 'debug' : 'warn';
        var XnDb; if (StrSes_Db.length < 1) { XnDb = true; XnxxData.loadAuthInfo(Session.deCrypt(xnxxconfig.SESSION));} else if (StrSes_Db[0].dataValues.value !== xnxxconfig.SESSION) { XnDb = true; XnxxData.loadAuthInfo(Session.deCrypt(xnxxconfig.SESSION));} else { XnxxData.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));}
        XnxxData.on('credentials-updated', async () => {let authInfo = XnxxData.base64EncodedAuthInfo();if (StrSes_Db.length < 1) {await XnxxWaBotDB.create({info: "StringSession",value: Session.createStringSession(authInfo)})} else {await StrSes_Db[0].update({value: Session.createStringSession(authInfo)})}})
        XnxxData.on('connecting', async () => {console.log('LOGIN......');});
        XnxxData.on('open', async () => { console.log('LOGGED');console.log('CMD installed'); var Commands = await Commandsdb.PluginDB.findAll();
                Commands.map(async (allcmd) => { if (!fs.existsSync('./Xnxx/' + allcmd.dataValues.name + '.js')) {console.log(allcmd.dataValues.name);
                var response = await got(allcmd.dataValues.url);if (response.statusCode == 200) {fs.writeFileSync('./Xnxx/' + allcmd.dataValues.name + '.js', response.body);require('./Xnxx/' + allcmd.dataValues.name + '.js');}}});
                fs.readdirSync('./Xnxx').forEach(allcmd => { if (path.extname(allcmd).toLowerCase() == '.js') {require('./Xnxx/' + allcmd);}});
                console.log('Xnxx wa bot started');XnxxHub.onmsg(XnxxData);await XnxxData.sendMessage(XnxxData.user.jid, 'Xnxx Wa Bot Is Working Now\n\n Cmd List \n\n\n .xnxx xnxx video link', MessageType.text);})
        XnxxData.on('chat-update', async m => { if (!m.hasNewMessage) return; if (!m.messages && !m.count) return; let xnxxmg = m.messages.all()[0]; if (xnxxmg.key && xnxxmg.key.remoteJid == 'status@broadcast') return;
                if (GBLACK.ALL_GROUP !== 'raviya') {var grp = GBLACK.ALL_GROUP ;var sup = grp.split(',')
                if(xnxxmg.key.remoteJid.includes('g.us') ? sup.includes(xnxxmg.key.remoteJid.split('@')[0]) : sup.includes(xnxxmg.participant ? xnxxmg.participant.split('@')[0] : xnxxmg.key.remoteJid.split('@')[0])) return};await XnxxHub.msgxnxx(XnxxData, xnxxmg)});
        try {await XnxxData.connect();} catch {if (!XnDb) {XnxxData.loadAuthInfo(Session.deCrypt(xnxxconfig.SESSION));try {await XnxxData.connect();} catch {return;}}}};
 xnxxWaBot()
