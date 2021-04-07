const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client()

const tmi = require('tmi.js');

const twitch_client = new tmi.Client({
	connection: { reconnect: true },
	channels: [ config.twitch_channel ]
});

const jsonfile = require ("jsonfile")
const fs = require("fs")

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOGS] commands not found!")
  }

  //console.log("[LOGS] commands found :")
  jsfile.forEach((f, i) => {
    //console.log(f)
    let pull = require(`./commands/${f}`)
    bot.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    })
  })
})

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`)
  if(fs.existsSync("./commands/safe_list.json")){
    bot.not_safe = jsonfile.readFileSync("./commands/safe_list.json")
  }

  twitch_client.connect();

  bot.live_mode = false
  bot.sound_collections = []

  try {updateCollections()}
  catch(error) {console.error(error)}
})

bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return

  let prefix = config.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  if(bot.sound_collections.includes(cmd.slice(prefix.length))){
    let airhorn_number = -1
    if(Number.isInteger(parseInt(args[0]))) airhorn_number = args[0]
    let commandFile = bot.commands.get("airhorn")
    if(commandFile) commandFile.run(bot, message, cmd.slice(prefix.length)+" "+airhorn_number)
  }
  else{
    let commandFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandFile) commandFile.run(bot, message, args)
  }
})

twitch_client.on('message', (channel, tags, message, self) => {
  if(self || !message.startsWith(config.prefix) || bot.live_mode == false) return
  if(!tags.mod && (channel != "#"+tags.username) && (tags.username != config.twitch_owner)) return

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

  if(bot.sound_collections.includes(command)){
    let commandFile = bot.commands.get("airhornlive")
    if(commandFile) commandFile.run(bot, "twitch", command)
  }
});

function updateCollections(){
  bot.sound_collections = fs.readdirSync("./commands/audio/")
  //console.log("Getting collections : "+bot.sound_collections)
}

bot.login(config.token);
