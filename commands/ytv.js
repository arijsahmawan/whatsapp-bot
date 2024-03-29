const { bold } = require("@mengkodingan/ckptw")
const { youtubedl, youtubedlv2} = require("@bochilteam/scraper")

module.exports = {
	name: "ytmp4",
	aliases: ["ytv", "youtube"],
	category: "downloader",
	code: async (ctx) => {
		const link = ctx._args.join(" ")
		if(!link) return ctx.reply(`${bold('[ ! ]')} Sertakan link!`)
		try{
			let data;
			try{
				data = await youtubedl(link)
			}catch(err){
				data = await youtubedlv2(link)
			}
			const dl = data.video['auto'].download
			const url = await dl()
			return ctx.reply( {video: {url: url}, caption: data.title, gifPlayback: false} )
		}catch(err){
			return ctx.reply(`${bold('[ Terjadi kesalahan: ]')} ${err}`)
		}
		
	}
}
