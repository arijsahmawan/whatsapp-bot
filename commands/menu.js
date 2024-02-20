const sekarang = new Date()
const { bold } = require("@mengkodingan/ckptw");
const fs = require('fs')

const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const nHari = hari[sekarang.getDay()]
const tanggal = sekarang.getDate()
const bulan = sekarang.getMonth()+1
const tahun = sekarang.getFullYear()
const jam = sekarang.getHours()
const menit = sekarang.getMinutes()

function time(jam){
    if(jam >= 5 && jam < 12) return 'pagi'
    else if(jam >= 12 && jam < 17) return 'siang'
    else if(jam >= 17 && jam < 20) return 'sore'
    else if(jam >= 20) return 'malam'
}

function formatType(type) {
    return type.replace(/_/g, ' ')
        .replace(/\b\w/g, (match) => match.toUpperCase());
}

const info = `\n*Hari, Tanggal* : ${nHari}, ${tanggal}-${bulan}-${tahun} \n*Waktu* : ${jam}.${menit}\n*Prefix* : .\n\n`

module.exports = {
    name: 'menu',
    category: 'info',
    code: async (ctx) => {
        var urlImg = await ctx._client.profilePictureUrl(ctx._self.core.user.id, 'image')
        const id = ctx.id.split('@')[1] === 'g.us' ? ctx._msg.key.participant : ctx._msg.key.remoteJid
        const cmdMap = ctx._self.cmd

        if(!cmdMap || cmdMap.size === 0) return ctx.reply(`${bold('[ ! ]')} Terjadi kesalahan: Tidak ada perintah yang ditemukan.`)

        const sortedCategories = ['main', 'downloader', 'converter', 'fun', 'internet', 'tools', 'info', 'owner'];

        var text = ''

        for(const category of sortedCategories){
            const categoryCommands = Array.from(cmdMap.values())
            .filter(command => command.category === category)
            .map(command => ({
                name: command.name,
                aliases: command.aliases
            }))
            if (categoryCommands.length > 0) {
                const formattedType = formatType(category);
                text += `> 「 ${bold(formattedType)} 」\n`;
    
                if (category === 'main') {
                    text += `• ${categoryCommands.map(cmd => `${ctx._used.prefix || '/'}${cmd.name}${cmd.aliases ? `\n• ${cmd.aliases.map(alias => `${ctx._used.prefix || '/'}${alias}`).join('\n• ')}` : ''}`).join("\n• ")}\n`;
                } else {
                    text += `• ${categoryCommands.map(cmd => `${ctx._used.prefix || '/'}${cmd.name}`).join("\n• ")}\n`;
                }
                text += `\n`;
            }
        }
        text+='Dibuat dengan ❤️ oleh Koordinator Sekbid 7\n\n*— OSIS SMK WIn-G —*'
        
        await ctx.reply({
            image: {
                url: urlImg
            },
            caption: `*[BOT OSIS SMK WIn-G]*\n\nSelamat ${time(jam)} @${id.split('@')[0]}. Berikut adalah daftar perintah yang tersedia!\n` + info + text,
            mentions: [id]
        })
    },
}
