const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner) return message.reply("You must be bot owner")

  if(bot.live_mode == true){
    bot.live_mode = false
    message.channel.send("```Live-mode set to OFF```")
  }else{
    bot.live_mode = true
    message.channel.send("```Live-mode set to ON```")
  }

  return message.delete()
}

module.exports.config = {
  name: "livemode",
  aliases: ["lmd"],
  args: [],
  usage : ["livemode"],
  desc: "Set live-mode (only for bot owner)."
}
