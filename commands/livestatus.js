const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(bot.live_mode == true) message.channel.send('Live mode is ON')
  else message.channel.send('Live mode is OFF')
  voice_channel = bot.channels.cache.get(bot.stream_channel)
  message.channel.send("Stream Channel set to "+bot.stream_channel+"/"+voice_channel.name)
  message.delete()
}

module.exports.config = {
  name: "livestatus",
  aliases: ["lst"],
  args: [],
  usage: ["livestatus"],
  desc: "Send live mode status."
}
