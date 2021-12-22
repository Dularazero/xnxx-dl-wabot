//Xnxx Dl Wa Bot
let XNXXDL = require('xnxx-dl-wa');let xnxxconfig = XNXXDL.xnxxconfig;XnxxHub = XNXXDL.XnxxHub; let XnxxWA = XNXXDL.xnxxhandler
let WorkType = xnxxconfig.WORKTYPE == 'public' ? false : true
let { MessageType } = require('@adiwajshing/baileys');
let simpleGit = require('simple-git');
let git = simpleGit();
let Heroku = require('heroku-client');
let heroku = new Heroku({ token: xnxxconfig.HEROKU.API_KEY })


XnxxWA.IntroduceCMD({pattern: 'alive ?(.*)', fromMe: WorkType},(async (message, input) => { 
return await message.client.sendMessage(message.jid,'Xnxx Wa Bot Is Alive..\n\n\n Commands \n\n.xnxx link\n.snxx or .snxx mia\n.img or .img ass \n\n', MessageType.text);    
}));
XnxxWA.IntroduceCMD({pattern: 'alive ?(.*)', fromMe: true},(async (message, input) => { 
  if(WorkType) return;
return await message.client.sendMessage(message.jid,'Xnxx Wa Bot Is Alive..\n\n\n Commands \n\n.xnxx link \n\n', MessageType.text);    
}));

XnxxWA.IntroduceCMD({pattern: 'update ?(.*)', fromMe: true}, (async (message, input) => {
    await git.fetch();
    var commits = await git.log(['main..origin/main']);
    if (commits.total === 0) {
        return await message.client.sendMessage(message.jid,'*No Update Available*', MessageType.text);    
    } else {
    var degisiklikler = 'new updates\n\n'
        commits['all'].map(
            (commit) => {degisiklikler += '▫️ ' + commit.date.substring(0, 10) + ':\n' + commit.message + '\n✧' + commit.author_name + '➣\n\n';});
        await message.client.sendMessage(message.jid,degisiklikler + '```', MessageType.text); 
        var on_progress = false
        if (on_progress) return await message.client.sendMessage(message.jid,'xnxx wa bot is updating',MessageType.text)
        var guncelleme = await message.reply('updating..');
            try {
                var app = await heroku.get('/apps/' + xnxxconfig.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(
                    message.jid,'heroku api invalid', MessageType.text);
                await new Promise(r => setTimeout(r, 1000));
                return;}

            git.fetch('upstream', 'main');
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + xnxxconfig.HEROKU.API_KEY + "@"
            )
            on_progress = true
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote failed'); }
            await git.push('heroku', 'main');
            await message.client.sendMessage(message.jid,'Successful Updated', MessageType.text);
            await message.sendMessage('restarting');}
}));

let baseURI = '/apps/' + xnxxconfig.HEROKU.APP_NAME;

XnxxWA.IntroduceCMD({pattern: 'restart$', fromMe: true}, (async (message, input) => {

    await message.client.sendMessage(message.jid,'restarting..', MessageType.text);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

XnxxWA.IntroduceCMD({pattern: 'shutdown$', fromMe: true}, (async(message, input) => {

    await heroku.get(baseURI + '/formation').then(async (formation) => {
        forID = formation[0].id;
        await message.client.sendMessage(message.jid,'shutting down...', MessageType.text);
        await heroku.patch(baseURI + '/formation/' + forID, {
            body: {
                quantity: 0
            }
        });
    }).catch(async (err) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

