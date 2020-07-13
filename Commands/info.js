const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
const embed = new Discord.MessageEmbed()
embed.setColor('#4253ff')
embed.setTitle(`Info`)
embed.setFooter(`Current version: ${config.version}`)
embed.addField(`Version`, config.version)
embed.addField(`Current prefix`, config.prefix)
if (mainfile.devmode === 1) embed.addField(`Bot Mode`, `Development`)
if (mainfile.devmode === 0) embed.addField(`Bot Mode`, `Normal`)
embed.addField(`Youtube Channel`,`https://bit.ly/MCreedonChannel`)
embed.addField('Roblox Group','https://bit.ly/MCreedonGroup')
//embed.addField(`Command Handler`,`FreakCraft`)
msg.channel.send(embed)
}
module.exports.help = {
    name:"info",
    description:"Shows a lot of info"
}