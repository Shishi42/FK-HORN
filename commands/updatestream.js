const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner) return message.reply("You must be bot owner")

  bot.stream_channel = args
  message.channel.send("Stream Channel set to "+args)

  return message.delete()
}

module.exports.config = {
  name: "updatestream",
  aliases: ["upsch"],
  args: ["<id>"],
  usage : ["updatestream <id>"],
  desc: "Update stream channel with id"
}
