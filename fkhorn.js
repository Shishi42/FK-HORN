const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client({intents: 3276799})
const { Player } = require("discord-player")
const slashcommands_loader = require("./slashcommands_loader")
const cron = require("cron")
const { getGamesEurope, getGamesJapan } = require('nintendo-switch-eshop');

bot.commands = new Discord.Collection()
bot.color = "553380"

bot.player = new Player(bot)
bot.player.extractors.loadDefault()

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`)
	await slashcommands_loader(bot)
	bot.user.setPresence({activities: [{ name: "Les flops d'IceiNoZ", type: 3 }], status: "online"})
})

bot.on("interactionCreate", async (interaction) => {
  if(interaction.type === Discord.InteractionType.ApplicationCommand) { require(`./commands/${interaction.commandName}`).run(bot, interaction, interaction.options) }
  if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let choices = []
    const focusedOption = interaction.options.getFocused(true)

    if(interaction.commandName === "help") { choices = bot.commands.map(cmd => cmd.name) }
    if(interaction.commandName === "play") { choices = ["Yes", "No"] }

    let filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase()))
    if(!focusedOption.value) filtered = choices
    if(filtered.length > 20) filtered = filtered.slice(0, 20)
    await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })))
  }
})

bot.player.events.on("playerStart", async (queue, track) => {
  embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`Starting playing : **${track.title}**.`)
    .addFields({name: "Author", value: `${track.author}`})
    .addFields({name: "Duration", value: `${track.duration}`})
    .addFields({name: "Views", value: `${track.views}`})
    .setThumbnail(track.thumbnail)
    .setTimestamp()
    .setFooter({text: `Song requested by ${track.requestedBy.username}`, iconURL: `${track.requestedBy.displayAvatarURL({dynamic: true})}`})
  if(track.playlist) embed.addFields({name: "Playlist", value: `${track.playlist.title}`})
  queue.metadata.channel.send({ embeds: [embed] })
})

new cron.CronJob('00 * * * * *', () => {
  date = new Date()
  date_str = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' - '+date.getHours()+':'+date.getMinutes()

  getGamesEurope().then(games => {
    filtered = games.filter((game) => game.title.toLowerCase().includes("inazuma"))
    filtered.length ?
      filtered.forEach(game => {
        bot.channels.fetch("1219989241782599801").then(chan => chan.send(`\`${date_str}\` **${game.title}** by __${game.developer}__ was found on the **European eShop** :flag_eu: @everyone`))
        //bot.channels.fetch("662216228340760596").then(chan => chan.send(`\`${date_str}\` **${game.title}** by __${game.developer}__ was found on the **European eShop** :flag_eu:`))
      }) :
      bot.channels.fetch("1219989241782599801").then(chan => chan.send(`\`${date_str}\` : no hit for **Inazuma Eleven** on the **European eShop** :flag_eu:`))
  })

  getGamesJapan().then(games => {
    filtered = games.filter((game) => game.TitleName.includes("イナズマ"))
    filtered.length ?
      filtered.forEach(game => {
        bot.channels.fetch("1219989241782599801").then(chan => chan.send(`\`${date_str}\` **${game.TitleName}** by __${game.MakerName}__ was found on the **Japanese eShop** :flag_jp: @everyone`))
        //bot.channels.fetch("662216228340760596").then(chan => chan.send(`\`${date_str}\` **${game.TitleName}** by __${game.MakerName}__ was found on the **Japanese eShop** :flag_jp:`))
      }) :
      bot.channels.fetch("1219989241782599801").then(chan => chan.send(`\`${date_str}\` : no hit for **Inazuma Eleven** on the **Japanese eShop** :flag_jp:`))
  })
}).start()

bot.login(config.token)

getGamesJapan().then(games => games.forEach(game => console.log(game.TitleName.toLowerCase())))