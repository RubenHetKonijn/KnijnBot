const Discord = require('discord.js');
const mainfile = require('../bot.js');
const log = mainfile.log
const os = require('os')
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
    embed.addField(`CPU Usage`,`1 minute: ${os.loadavg[1]} \n 5 minute: ${os.loadavg[2]} \n 15 minute: ${os.loadavg[3]}`)
    embed.addField('RAM Usage',`${Math.round((os.totalmem - os.freemem)/1024/1024)} MB / ${Math.round(os.totalmem/1024/1024)} MB`)
//embed.addField(`Command Handler`,`FreakCraft`)
    msg.channel.send(embed)
}
module.exports.help = {
    name:"info",
    description:"Shows a lot of info"
}