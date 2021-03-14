const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client()

const jsonfile = require ("jsonfile")
const fs = require("fs")

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.desc = new Discord.Collection()
bot.args = new Discord.Collection()

bot.sound_collections = []

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOGS] ne trouve pas de commandes!")
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`)
    bot.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    })
    pull.config.desc.forEach(desc => {
      bot.desc.set(desc, pull.config.name)
    })
    pull.config.args.forEach(args => {
      bot.args.set(args, pull.config.name)
    })
  })
})

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`)
  try {updateCollections()}
  catch(error) {console.error(error)}
})

bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return

  let prefix = config.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let cmd_name = cmd.slice(prefix.length)
  let args = messageArray.slice(1)

  if(bot.sound_collections.includes(cmd_name) && args.length == 0){
    let commandFile = bot.commands.get("airhorn")
    if(commandFile) commandFile.run(bot, message, cmd_name)
  }
  else{
    let commandFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandFile) commandFile.run(bot, message, args)
  }
})

function updateCollections(){
  bot.sound_collections = fs.readdirSync("./commands/audio/")
  //console.log("Getting collections : "+bot.sound_collections)
}

bot.login(config.token);
