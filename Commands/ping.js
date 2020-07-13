const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
const msg2 = await msg.channel.send("Ping?");
  msg2.edit(`Pong! Latency is ${msg2.createdTimestamp - msg.createdTimestamp}ms.`);
}
module.exports.help = {
    name:"ping",
    description:"Shows ping time"
}