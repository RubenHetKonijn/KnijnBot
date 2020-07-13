const Discord = require('discord.js');
const mainfile = require('../bot.js')
config = mainfile.config
module.exports.run = async(bot, msg, args)=>{
if (isNaN(args[0])) {
msg.channel.send(`ERROR: You didn't specify a value in the first argument, try ${config.prefix}random 1 5`) 
return }
if (isNaN(args[1])) {
msg.channel.send(`ERROR: You didn't specify a value in the second argument, try ${config.prefix}random 1 5`) 
return }
if (!isNaN(args[2])) {
    msg.channel.send(`ERROR: You specified a third argument, that's illegal, try ${config.prefix}random 1 5`)  
    return
}
randomnum = Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0])
msg.channel.send(randomnum);
}
module.exports.help = {
    name:"random",
    description:"Generates a random number"
}