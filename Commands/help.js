const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
embed = new Discord.MessageEmbed
embed.setColor('#4253ff')
embed.setTitle(`Help`)
embed.setFooter(`Current version: ${config.version}`)
embed.addField(`Informational commands`,` ${config.prefix}changelog \n ${config.prefix}credits \n ${config.prefix}help\n ${config.prefix}ping\n ${config.prefix}info\n ${config.prefix}credits`)
embed.addField(`Fun commands`, ` ${config.prefix}echo (Replicates a sentence you provide | Usage: echo [your sentence]) \n ${config.prefix}random (Generates a random number | Usage: random [lower number] [upper number])`)
if(msg.member.hasPermission("MANAGE_MESSAGES")) {
embed.addField(`Admin commands`,`${config.prefix}config \n ${config.prefix}kick`)
}
embed.addField(`Video commands`,`${config.prefix}a \n ${config.prefix}b \n ${config.prefix}e`)

msg.channel.send(embed)
}
module.exports.help = {
    name:"help",
    description:"Shows Help"
}