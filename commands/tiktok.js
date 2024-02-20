const { bold } = require('@mengkodingan/ckptw');
const fg = require('api-dylux')

module.exports = {
    name: 'ttdl',
    aliases: ['tt', 'tiktok', 'vt'],
    category: 'downloader',
    code: async (ctx) => {
        const link = ctx._args.join(' ')
        if(!link) return ctx.reply(`${bold('[ ! ]')} Masukkan URL!`);

        try{
            let data = await fg.tiktok(link)
            // console.log(data.hdplay)
            await ctx.reply({
                video: {
                    url: data.hdplay || data.play
                },
                caption: `*Username* : ${data.unique_id}\n*Duration* : ${data.duration}`,
                gifPlayback: false
            })
        }catch(err){
            console.error(err)
            return ctx.reply(`${bold('[ ! ]')} Terjadi kesalahan: ${err.message}`);
        }
    },
}