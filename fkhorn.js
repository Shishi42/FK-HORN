const Discord = require("discord.js");

const bot = new Discord.Client();
const config = require("./config.json");
const collections = require("./collections.json");

const jsonfile = require ("jsonfile")

const fs = require("fs");
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOGS] ne trouve pas de commandes!");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`)
    bot.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    })
  })
})

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`);
})

bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return;

  let prefix = config.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let cmd_name = cmd.slice(prefix.length)
  let args = messageArray.slice(1)

  if(collections.list.includes(cmd_name) && args.length == 0){
    let commandFile = bot.commands.get("airhorn")
    if(commandFile) commandFile.run(bot, message, cmd_name)
  }else if(collections.list.includes(cmd_name) && args.length != 0){
    let commandFile = bot.commands.get("help")
    if(commandFile) commandFile.run(bot, message, "")
  }else if(cmd_name == "help"){
    let commandFile = bot.commands.get("help")
    if(commandFile) commandFile.run(bot, message, "")
  }
})

bot.login(config.token);
