const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.guild.me.voice.kick("Disconnect Command")
  return message.delete()
}

module.exports.config = {
  name: "disconnect",
  aliases: ["dis","disco"],
  args: [],
  usage: ["disconnect"],
  desc: "Disconnect the bot from the voice channel."
}
