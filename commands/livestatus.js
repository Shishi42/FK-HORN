const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  str = "```"
  if(bot.live_mode == true) str += "Live-mode is ON\n"
  else str += "Live-mode is OFF\n"
  voice_channel = bot.channels.cache.get(bot.stream_channel)
  str += "Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"\n"
  str += "```"
  message.channel.send(str)
  message.delete()
}

module.exports.config = {
  name: "livestatus",
  aliases: ["lst"],
  args: [],
  usage: ["livestatus"],
  desc: "Send live-mode status."
}
