const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner) return message.reply("You must be bot owner")

  if(bot.safe_mode == true){
    bot.safe_mode = false
    return message.channel.send("Safe mode set to OFF")
  }else{
    bot.safe_mode = true
    return message.channel.send("Safe mode set to ON")
  }
}

module.exports.config = {
  name: "safemode",
  aliases: ["sfm"],
  args: [],
  usage : ["safemode"],
  desc: "Set safe mode."
}
