const {MessageEmbed} = require("discord.js");
const discordConfig = require('./discordConfig.json');
const mainfile = require('../bot.js')
config = mainfile.config
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
module.exports.run = async(bot, msg, args)=>{
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You don't have enough permissions to use this command.");
    let serverId = msg.guild.id;

    const client = new MongoClient("mongodb+srv://freakcraft:4dL7OaFpdLmWOQaK@wikitags-uckz6.mongodb.net", { useNewUrlParser: true })
    client.connect(function(err){ 
        if(err) console.log('err');
        if(!client) return msg.channel.send("Couldnt retrieve data from database");
    let db = client.db("MCreedenBot");
    let Servers = db.collection("Servers");
    Servers.findOne({serverId: serverId}).then(server=>{
    let chatChannel = "";
    let commandChannel = "";
        
    let serverIndex = discordConfig.servers.findIndex(server=> server.id == serverId);
    
    if(server){
        chatChannel = server.chatChannel;
        commandChannel = server.commandChannel;
    }else{
        chatChannel = "not set";
        commandChannel = "not set";
    }
    const configEmbed = new MessageEmbed()
    .setTitle("Config")
    .setDescription("configure the channels where the bot should be accessbile")
    .addField("Chat", `<#${chatChannel}>`)
    .addField("Commands", `<#${commandChannel}>`)
    .setFooter("React with ✍️ to edit the config")
    msg.channel.send(configEmbed).then(sentMessage =>{
        sentMessage.react("✍️");
        const filter = (reaction, user)=>{
            return reaction.emoji.name === '✍️' && user.id === msg.author.id;
        }
        const collector = sentMessage.createReactionCollector(filter, {time: 15000});
        collector.on('collect', (reaction, user)=>{
            const filter2 = m => m.author.id === msg.author.id;
            let setEmbed = new MessageEmbed()
            .setTitle("Set channels")
            .setDescription("Configure the bot channels")
            .addField('Chat', chatChannel)
            .addField('Commands', commandChannel)
            .setFooter('Please send the channel two channels separated with space');
            msg.channel.send(setEmbed).then(()=>{
                msg.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] }).then(m=>{
                    let mArgs = m.first().content.split(' ');
                    if(!mArgs.length == 2){
                        return m.channel.send("ERROR: you didn't provide two channels");
                    }
                    let chatC = mArgs[0].slice(2, -1);
                    let chatC2 = mArgs[1].slice(2, -1);
                    
                    let obj = {
                        serverId: serverId,
                        chatChannel: chatC,
                        commandChannel: chatC2
                    }
                    
                    if(!server){
                        Servers.insertOne(obj, function(inserted){
                            return msg.channel.send("Successfully set the channels");
                        })
                    }else{
                        Servers.updateOne({serverId: serverId}, {$set: {chatChannel: obj.chatChannel, commandChannel: obj.commandChannel} }, function(err, count){
                            return msg.channel.send("Successfully set the channels");
                        })
                    }
                    
                })
            })
            
            
        })
    }) 
    })
    })
        
    
    
    
    
    
}
//yea
//
module.exports.help = {
    name:'config',
    description:'Configures discord channels'
}