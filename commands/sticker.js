require('../config.js');
const { bold } = require('@mengkodingan/ckptw');
const sticker = require('wa-sticker-formatter')
//const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
    name: 'sticker',
    aliases: ['stiker', 's'],
    category: 'converter',
    code: async (ctx) => {
        let mediaMsg = ctx.msg.message.imageMedia || ctx.msg.message.videoMessage
        if(ctx.msg.messageType === 'imageMessage' || ctx.msg.messageType === 'videoMessage'){
            const media = 'https://mmg.whatsapp.net' + ctx.msg.message.imageMessage.directPath
            // const stream = await require('@whiskeysockets/baileys').downloadContentFromMessage(media, 'image')
            // await ctx.reply(media)
            const buffer = await ctx.getMediaMessage(ctx.msg, 'buffer')
            await ctx.reply(buffer)
        }
    }
    
};
