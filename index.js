const { Client, CommandHandler } = require('@mengkodingan/ckptw');
const { Events, MessageType } = require('@mengkodingan/ckptw/lib/Constant');
const path = require('path');
const { inspect } = require('util');
require('./config.js')
const { exec } = require('child_process');

const bot = new Client({
    name: "Arij",
    prefix: ".",
    printQRInTerminal: true,
    readIncommingMsg: true
});

const cmd = new CommandHandler(bot, path.resolve() + '/commands');
cmd.load();

bot.ev.once(Events.ClientReady, (msg) => {
    console.log(`===> Bot terhubung dengan nomor : ${msg.user.id}`);
});

bot.ev.on(Events.MessagesUpsert, async (msg, ctx) => {
    try{
        if(msg.key.fromMe) return;
        
        if(ctx._used.commands && ctx._used.prefix) {
            ctx.simulateTyping()
        }

        if(ctx._sender.jid.includes(global.owner.number) || ctx._sender.jid.includes(global.ketos.number)){
            ctx.simulateTyping()
            if(msg.content.startsWith('> ')){
                const code = msg.content.slice(2)
                const result = await eval(code)
                await ctx.reply(inspect(result))
            }

            if(msg.content.startsWith('$ ')){
                const command = msg.content.slice(2)
                const output = await new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if(error) reject (new Error(`Error: ${error}`))
                        else if (stderr) reject(new Error(stderr))
                        else resolve(stdout)
                    })
                })
                await ctx.reply(output)
            }
        }
    }catch(err){
        console.error(err)  
    }
})

bot.launch();
