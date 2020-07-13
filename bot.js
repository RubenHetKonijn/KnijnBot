const Discord = require('discord.js');
const Bot = new Discord.Client();
var config = require('./config.json');
const fs = require('fs');
const forbiddenWords = ["http","crap","shit","fuck",".com",".nl","www.",".co.uk","azz","a55","a55h01e",". com","nig","gay","gae","motherfucker","asshole","ass","dick","ding dong","s h i t","s h i _ t"]
const colors =  require('colors')
const chalk = require('chalk');
const figlet = require('figlet');
const ver = require('./ver.json')
var devmode = 0
const readline = require("readline");
const MongoClient = require('mongodb').MongoClient;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const cleverbot = require("cleverbot-free");

const log = {
  info: (str) => {
    console.log(`${chalk.bgHex('#4f4fff').white('| INFORMATION  |')} ${str}`)
  },
  error: (str) => {
    console.log(`${chalk.bgHex('#ff4f4f').white('|    ERROR     |')} ${str}`)
  },
  warning: (str) => {
    console.log(`${chalk.bgHex('#ffef4f').black('|   WARNING    |')} ${str}`)
  },
  success: (str) => {
    console.log(`${chalk.bgHex('#4fbf4f').white('|   SUCCESS    |')} ${str}`)
  },
  debug: (str) => {
    console.log(`${chalk.bgHex('#222224').white('|    DEBUG     |')} ${str}`)
  },
  message: (str) => {
    console.log(`${chalk.bgHex('#50c7c7').white('|   MESSAGE    |')} ${str}`)
  }
}

var myArgs = process.argv.slice(3);
if (myArgs[0] === "dev") {
  log.debug("Currently in developer mode") 
  config = require('./devconfig.json')
  devmode = 1
} else {
  log.debug("Currently in normal mode")
  devmode = 0
}


//Imports
Bot.commands = new Discord.Collection();
//Bot Collections
fs.readdir('./Commands/', (err, files)=>{
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <=0){
        log.error("No command Files found in the folder please add at least one.");
    }
    let commandsArray = new Array;
    let x = 0;
    jsfiles.forEach((f,i)=>{
        let props = require(`./Commands/${f}`);
        log.info(`${f} is loaded.`);
        Bot.commands.set(props.help.name, props);
        commandname = f.split(`.`);
        commandsArray.push(commandname);
        
        x = x+1
    })
    log.info(`Total commands: ${x}`);
    console.log(commandsArray)
    exports.commandsArray = commandsArray
    })
    
//Set all commands from the Commands folder
const client = new MongoClient("mongodb+srv://freakcraft:4dL7OaFpdLmWOQaK@wikitags-uckz6.mongodb.net", { useNewUrlParser: true });
client.connect(function(err){
  let db = client.db("MCreedenBot");
  let Servers = db.collection("Servers");
  if(err) console.log('err');
  Bot.on('ready', ()=>{
    figlet('KnijnBot', (err, data) => {
        if (err) { console.log(`${chalk.red('KnijnBot')} Version ${config.version}`); return; }
        console.log(`${chalk.red(data)} ${config.version}`);
      });
    log.success(`Logged in as ${Bot.user.tag}, current version is ${config.version}`);
    Bot.user.setActivity(`Current version: ${config.version}`, {type: "PLAYING"});
    });

Bot.on("guildMemberAdd", member=>{
  member.roles.add('657978291185254410');
});

Bot.on('message', msg=>{
    log.message(`(#${msg.channel.name}) <${msg.author.tag}> | ${msg.content}`)
    if(msg.author.bot) return;
    if(msg.channel.type == 'dm') return;
    if(isNaN(msg)) return;
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
      for (var i = 0; i < forbiddenWords.length; i++) {
         if (msg.content.includes(forbiddenWords[i].toLowerCase())) {
           log.debug(`${msg.author.username} said a bad word`);
           msg.delete();
           msg.channel.send(`${msg.author.username} said a bad word :o`);
           return;
         } }
        }
    let serverID = msg.guild.id;
    Servers.findOne({serverId: serverID}).then(server=>{ 
      
      
      if(!server) return;
     
      if(server.chatChannel == msg.channel.id){
        msg.channel.startTyping();
        cleverbot(msg.content).then(res=>{
          return msg.reply(res);
        })
        msg.channel.stopTyping();
      }
    })
    let prefix = config.prefix;
    if(!msg.content.startsWith(prefix)) return;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
    let commandFile = Bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(Bot,msg,args);
});
Bot.login(config.token)
})


// Exports

exports.config = config
exports.devmode = devmode
exports.log = log