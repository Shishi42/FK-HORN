const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner) return message.reply("You must be bot owner")

  if(args[0].toUpperCase() == "ON"){
    bot.live_mode = true
    message.channel.send("```Live-mode set to ON```")
    if(args[1] != undefined){
      bot.stream_channel = args[1]
      voice_channel = bot.channels.cache.get(bot.stream_channel)
      message.channel.send("```Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"```")
    }
  }else if(args[0].toUpperCase() == "OFF"){
    bot.live_mode = false
    message.channel.send("```Live-mode set to OFF```")
    if(args[1] != undefined){
      bot.stream_channel = args[1]
      voice_channel = bot.channels.cache.get(bot.stream_channel)
      message.channel.send("```Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"```")
    }
  }else{
    bot.stream_channel = args[0]
    voice_channel = bot.channels.cache.get(bot.stream_channel)
    message.channel.send("```Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"```")
  }
  
  return message.delete()
}

module.exports.config = {
  name: "live",
  aliases: [],
  args: ["on <id>","off <id>","<id>"],
  usage : ["live <args>"],
  desc: "Set live-mode and/or set stream channel (only for bot owner)."
}
