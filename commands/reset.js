const Discord = require("discord.js")
const config = require("../config.json");

const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (message.member != config.bot_owner) return message.channel.send('You are not the bot owner!')
  
  isSomethingReset = false
  
  if(args[0] == "logs"){
    fs.unlink("logs.txt", function(err) {})
    isSomethingReset = true
  }
  if(args[0] == "stats"){
    fs.unlink("stats.json", function(err) {})
    isSomethingReset = true
  }  
  if(args[0] == "all"){
   fs.unlink("logs.txt", function(err) {})
   fs.unlink("stats.json", function(err) {})
   isSomethingReset = true
  }
  
  if(isSomethingReset) message.channel.send("you have reseted +"args[0]+".")
}

module.exports.config = {
  name: "reset",
  aliases: ["rst","rs"],
  desc: "Reset the arg (only for bot owner)",
  args: ["logs","stats","all"]
}
