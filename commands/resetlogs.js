const Discord = require("discord.js")
const config = require("../config.json");

const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.member != config.bot_owner) return message.channel.send('You are not the Bot Owner !')

  fs.unlink("logs.txt", function(err))
}

module.exports.config = {
  name: "resetlogs",
  aliases: ["rl"],
  desc: "Reset the logs (only for bot owner)"          
}
