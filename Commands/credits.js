const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
const embed = new Discord.MessageEmbed()
embed.setColor('#4253ff')
embed.setTitle(`Credits`)
embed.setFooter(`Current version: ${config.version}`)
embed.addField(`Channel Owner`,`MCreedonDude`)
embed.addField(`Channel Editor`, `RubenKnijn`)
embed.addField(`Bot Creator`, `RubenKnijn`)
embed.addField(`Command Handler`,`FreakCraft`)
msg.channel.send(embed)
}
module.exports.help = {
    name:"credits",
    description:"Shows all the credits"
}