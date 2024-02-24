const sekarang = new Date()
const { bold } = require("@mengkodingan/ckptw");
const fs = require('fs')
const moment = require("moment-timezone")

const timeZone = {timezone: 'Asia/Jakarta'}
moment.tz.setDefault('Asia/Jakarta').locale('id')

const nHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
let hari = nHari[sekarang.getDay().toLocaleString('en-US', timeZone)]
let tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
let jam = moment.tz('Asia/Jakarta').format('HH:mm')

function formatType(type) {
    return type.replace(/_/g, ' ')
        .replace(/\b\w/g, (match) => match.toUpperCase());
}

const info = `\n*Hari* : ${hari}\n*Tanggal* : ${tanggal} \n*Waktu* : ${jam}\n\n`

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
            caption: `*[BOT OSIS SMK WIn-G]*\n\nSelamat ${dt} @${id.split('@')[0]}. Berikut adalah daftar perintah yang tersedia!\n` + info + text,
            mentions: [id]
        })
    },
}
