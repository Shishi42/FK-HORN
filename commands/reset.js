const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  if (message.member != config.bot_owner) return message.channel.send('You are not the bot owner!')
  fs.unlink("logs.txt", function(err) {})

  return message.channel.send("Logs successfully reset.")
}

module.exports.config = {
  name: "reset",
  aliases: ["rst","rs"],
  args: [],
  usage: ["reset"],
  desc: "Reset logs (only for bot owner)."
}
