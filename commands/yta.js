const { bold } = require('@mengkodingan/ckptw')
const {youtubedl, youtubedlv2} = require('@bochilteam/scraper')

module.exports = {
  name: 'ytmp3',
  aliases: ['yta', 'ytaudio'],
  category: 'downloader',
  code: async (ctx) => {
    const link = ctx._args.join(" ")
		if(!link) return ctx.reply(`${bold('[ ! ]')} Sertakan link!`)
		let data;
		try{
			data = await youtubedl(link)
		}catch(err){
			data = await youtubedlv2(link)
		}
		const dl = data.audio['128kbps'].download
		const url = await dl()
    ctx.reply({
      image: {url: data.thumbnail},
      caption: `${bold('Judul')}: ${data.title}`
    })
		return ctx.sendMessage( ctx.id,
    {
      audio: {url: url},
      mimetype: 'audio/mp4',
      ppt: false
    } )
  }
}
