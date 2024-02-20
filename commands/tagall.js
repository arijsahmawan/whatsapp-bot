module.exports = {
    name: 'everyone',
    aliases: ['semua', 'all'],
    category: 'info',
    code: async (ctx) => {
        var data = await ctx._client.groupMetadata(ctx.id)
        var len = data.participants.length;
        var mentions = [];
        for (let i = 0; i < len; i++) {
            var serialized = data.participants[i].id.split('@')[0];
            mentions.push({
                tag: `@${serialized}`,
                mention: `${serialized}@s.whatsapp.net`
            });
        }
        var messageText = mentions.map(mention => mention.tag).join(' ');
        ctx.reply({ 
            text: messageText,
            mentions: mentions.map(mention => mention.mention)
        });
    },
}
