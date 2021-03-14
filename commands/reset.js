const Discord = require("discord.js")
const config = require("../config.json");

const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.member != config.bot_owner) return message.channel.send('You are not the Bot Owner !')
  
  if(args[0] == "logs") fs.unlink("logs.txt", function(err))
  if(args[0] == "stats") fs.unlink("stats.json", function(err))
  
  message.channel.send(args[0]+" reset.")
}

module.exports.config = {
  name: "reset",
  aliases: ["rst","rs"],
  desc: "Reset the arg (only for bot owner)"          
}
