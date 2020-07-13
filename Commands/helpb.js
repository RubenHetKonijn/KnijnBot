const Discord = require('discord.js');
const mainfile = require('../bot.js')
const commands = mainfile.commandsArray
module.exports.run = async(bot, msg, args)=>{
embed = new Discord.MessageEmbed
embed.setColor('#4253ff')
embed.setTitle(`Help (beta)`)
embed.setFooter(`Current version: ${config.version}`)
console.log(commands)
commands.forEach((commandName,i)=> {
   embed.addField(commandName,`*`) 
})
msg.channel.send(embed)
}
module.exports.help = {
    name:"helpb",
    description:"Shows ping time"
}