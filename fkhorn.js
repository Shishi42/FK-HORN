const Discord = require("discord.js")
const bot = new Discord.Client()

const auth = require("@twurple/auth")
// const chat = require("@twurple/chat")
const pubsub = require("@twurple/pubsub")

const jsonfile = require ("jsonfile")
const fs = require("fs")
const fsp = require('fs').promises

const config = require("./config.json")
// const tokenData = require("./refresh_tokens.json")
const tokenDataFK = require("./refresh_tokens_fk.json")

clientId = config.token_id_fk
clientSecret = config.token_secret_fk

bot.authfk = new auth.RefreshingAuthProvider(
	{
		clientId,
		clientSecret,
		onRefresh: async newTokenData => await fs.writeFile('./refresh_tokens_fk.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
	},
	tokenDataFK)

// clientId = config.token_id
// clientSecret = config.token_secret

// const authProvider = new auth.RefreshingAuthProvider(
// 	{
// 		clientId,
// 		clientSecret,
// 		onRefresh: async newTokenData => await fsp.writeFile('./refresh_tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
// 	},
// 	tokenData)
//
// bot.twitch_client = new chat.ChatClient({authProvider, channels: ['fk_aeon'] })
// bot.twitch_client.connect()

bot.on("ready", async () => {
	init()
  console.log(`Connecté en tant que ${bot.user.tag}!`)
})

bot.on("message", async message => {

  if(message.content == "https://tenor.com/view/bad-smell-arsenal-gif-23891771"){
    message.reply("j'en peux plus de ton gif de merde par pitié arrête.")
    return
  }
	
  if(message.content.toUpperCase() == "FEUR"){
    message.reply("ratio + t'es pas très beau + tes parents n'ont jamais été fiers de toi.")
    return
  }

  if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return

  let prefix = config.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

	// soundboard commands shortcut
  if(bot.sound_collections.includes(cmd.slice(prefix.length))){
    let sound_number = -1
    if(Number.isInteger(parseInt(args[0]))) sound_number = args[0]
    let commandFile = bot.commands.get("airhorn")
    if(commandFile) commandFile.run(bot, message, cmd.slice(prefix.length)+" "+sound_number)
  }
  else{
    let commandFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandFile) commandFile.run(bot, message, args)
  }
})

// bot.twitch_client.onMessage((channel, user, message) => {
// 	//
// })

function init(){

	bot.commands = new Discord.Collection()
	bot.aliases = new Discord.Collection()
	fs.readdir("./commands/", (err, files) => {

	  if(err) console.log(err)

	  let jsfile = files.filter(f => f.split(".").pop() === "js")

	  if(jsfile.length <= 0){
	    return console.log("[LOGS] commands not found!")
	  }

	  jsfile.forEach((f, i) => {
	    let pull = require(`./commands/${f}`)
	    bot.commands.set(pull.config.name, pull)
	    pull.config.aliases.forEach(alias => {
	      bot.aliases.set(alias, pull.config.name)
	    })
	  })
		bot.commands.get("rewards").run(bot, "rewards", "")
	})

	bot.sound_collections = []
	try {bot.sound_collections = fs.readdirSync("./audio/")}
	catch(error) {console.error(error)}

	if(fs.existsSync("./not_safe.json")){
		bot.not_safe = jsonfile.readFileSync("./not_safe.json")
	}

	bot.live_mode = false
	bot.stream_channel = config.stream_channel

	bot.user.setPresence({status : 'online', activity: { name: '!list for list of sounds', type: 'WATCHING' }})
	bot.months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]
}

bot.login(config.token)
