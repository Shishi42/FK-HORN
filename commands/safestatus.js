const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(bot.safe_mode == true) message.channel.send('Safe mode is ON')
  else message.channel.send('Safe mode is OFF')
  message.delete()
}

module.exports.config = {
  name: "safestatus",
  aliases: ["sst"],
  args: [],
  usage: ["safestatus"],
  desc: "Send safe mode status."
}
