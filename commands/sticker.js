require('../config.js');
const { bold } = require('@mengkodingan/ckptw');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
    name: 'sticker',
    aliases: ['stiker', 's'],
    category: 'converter',
    code: async (ctx) => {
        let mediaMsg = ctx.msg.message.imageMedia || ctx.msg.message.videoMessage
    }
    
};