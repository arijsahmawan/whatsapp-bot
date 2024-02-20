const fg = require('api-dylux')
const { bold } = require('@mengkodingan/ckptw');

module.exports = {
    name: 'fbdl',
    aliases: ['fb', 'facebook'],
    category: 'downloader',
    code: async (ctx) => {
        const link = ctx._args.join(' ')
        if(!link) return ctx.reply(`${bold('[ ! ]')} Masukkan URL!`);

        try{
            const data = await fg.fbdl(link)
            // console.log(data)
            await ctx.reply({
                video: {
                    url: data.videoUrl
                },
                caption: 'berhasil mendownload video',
                gifPlayback: false
            })
        }catch(err){
            console.error(err)
            return ctx.reply(`${bold('[ ! ]')} Terjadi kesalahan: ${err.message}`);
        }
    }
}