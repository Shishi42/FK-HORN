const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  if(message.member != config.bot_owner &&
    message.guild.members.cache.get(message.member.id).roles.cache.get(message.guild.roles.cache.find(r => r.name === "MDJ").id) == undefined &&
    !message.member.hasPermission('ADMINISTRATOR'))

    return message.reply("T'es ni MDJ ni admin ni Shishi mon reuf :face_with_raised_eyebrow:")

  players = message.mentions.members
  players_array = Array.from(message.mentions.members)
  channel = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''))

  players.forEach((p, _) => {
    channel.updateOverwrite(p, {SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true})
  });

  mentions_array = []
  players_array.forEach((item, _) => {
    mentions_array.push(item[1])
  })

  return channel.send(`Added ${mentions_array} to this channel.`)

}

module.exports.config = {
  name: "add2chan",
  aliases: ["add"],
  args: ["channel", "@members"],
  usage: ["add2chan <args>"],
  desc: "Add members to a channel."
}
