
let XNXXDL = require('xnxx-dl-wa');let xnxxconfig = XNXXDL.xnxxconfig; let XnxxHub = XNXXDL.XnxxHub; let XnxxWA = XNXXDL.xnxxhandler
let WorkType = xnxxconfig.WORKTYPE == 'public' ? false : true
let { MessageType } = require('@adiwajshing/baileys');

 
 // Xnxx Download With Unlimeted Access... Use .xnxx Your Xnxx Link
XnxxWA.IntroduceCMD({pattern: 'xnxx ?(.*)', fromMe: WorkType},( async (dlxnxx, input) => {
var Xnxxreg = /https:\/\/www\.xnxx\.com\/video/
if(Xnxxreg.test(input[1]) || input[1].includes('/-/')) {
await XnxxHub.xnxxVideoDownloader(dlxnxx, input)
} else {
return await dlxnxx.client.sendMessage(dlxnxx.jid, 'Need Xnxx Video Link', MessageType.text);
}
  }));
  
  
XnxxWA.IntroduceCMD({pattern: 'xnxx ?(.*)', fromMe: true},( async (dlxnxx, input) => {
if(xnxxconfig.WORKTYPE !== 'public') return;
var Xnxxreg = /https:\/\/www\.xnxx\.com\/video/
if(Xnxxreg.test(input[1]) || input[1].includes('/-/')) {
await XnxxHub.xnxxVideoDownloader(dlxnxx, input)
} else {
return await dlxnxx.client.sendMessage(dlxnxx.jid, 'Need Xnxx Video Link', MessageType.text);
}
  }));
