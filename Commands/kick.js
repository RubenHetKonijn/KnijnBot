const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
if(!msg.member.hasPermission("KICK_MEMBERS")) {
    return msg.channel.send(`**${msg.author.username}**, You do not have enough permission to use this command`)
  }
  
if(!msg.guild.me.hasPermission("KICK_MEMBERS")) {
    return msg.channel.send(`**${msg.author.username}**, I do not have enough permission to use this command`)
  }
  let target = msg.mentions.members.first();
    
if(!target) {
    return msg.channel.send(`**${msg.author.username}**, Please mention the person who you want to kick`)
    }
if(target.id === msg.author.id) {
    return msg.channel.send(`**${msg.author.username}**, You can not kick yourself`)
       }
    msg.channel.send(`say bye to ${target} because hes KICKED!`)
    target.kick(args[0]);
    let embed = new Discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Banned ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`Banned by ${msg.author.username}`);

    
}

module.exports.help = {
    name:"kick",
    description:"kicks a nub"
}