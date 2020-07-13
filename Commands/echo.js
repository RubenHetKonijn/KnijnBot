const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
    if(args.length <= 0) return msg.channel.send("ERROR: You did not supply any sentence to echo");
    const embed = new Discord.MessageEmbed()
	.setColor('#4253ff')
    .setDescription(`Echo by ${msg.author.tag}`)
    .addField(`${args.join(" ")}`,"​ ",true)
    if (msg.deletable) msg.delete(); 
    msg.channel.send(embed);
}
module.exports.help = {
    name:"echo",
    description:"Echos the message"
}