const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
const embed = new Discord.MessageEmbed()
embed.setColor('#4253ff')
embed.setTitle(`Changelog`)
embed.setFooter(`Current version: ${config.version}`)
embed.addField(`Version 0.1.3`,`- Bot, just bot`)
embed.addField(`Version 0.1.2`, `- Presence now works! \n`)
embed.addField(`Version 0.1.1`,`- Edited ${config.prefix}info command to show more info \n- Updated ${config.prefix}help \n- Made the development bot to make seperating development and full release easier \n- Edited the internal code accordingly`)
embed.addField(`Version 0.1.0`, `- Added the ${config.prefix}ping command \n- Added swearword checking \n- Made a ${config.prefix}e command\n- Made a ${config.prefix}b command\n- Made a ${config.prefix}kick command  `)
embed.addField(`Version 0.0.4`, `- Some internal changes \n Added the ${config.prefix}info command`)
embed.addField(`Version 0.0.3`,`- Edited the help command to be a little more useful \n- Fixed the ${config.version}echo command \n- Fixed the ${config.version}echo command again `)
//embed.addField(`Version 0.0.0`, ``)
msg.channel.send(embed)
}
module.exports.help = {
    name:"changelog",
    description:"Shows the changelog"
}