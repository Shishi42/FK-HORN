const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner &&
    bot.guilds.cache.get("474666633378529280").members.cache.get(message.member.id).roles.cache.get("681969539843751979") == undefined)
    return message.reply("You must be bot owner or streamer.")

  if(args[0] === undefined) return

  if(args[0].toUpperCase() == "ON"){
    bot.live_mode = true
    message.channel.send("```Live-mode set to ON```")
    if(args[1] != undefined){
      bot.stream_channel = args[1]
      voice_channel = bot.channels.cache.get(bot.stream_channel)

      try{
        message.channel.send("```Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"```")
      }catch{
        message.channel.send("Stream Channel ID provided is invalid.")
      }
    }

  }else if(args[0].toUpperCase() == "OFF"){
    bot.live_mode = false
    message.channel.send("```Live-mode set to OFF```")

  }else if(args[0].toUpperCase() == "STATUS"){
    str = "```"
    if(bot.live_mode == true) str += "Live-mode is ON\n"
    else str += "Live-mode is OFF\n"
    voice_channel = bot.channels.cache.get(bot.stream_channel)

    try{
      str += "Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name
    }catch{
      message.channel.send("Stream Channel provided is invalid.")
    }
    str += "```"
    message.channel.send(str)

  }else{
    bot.stream_channel = args[0]
    voice_channel = bot.channels.cache.get(bot.stream_channel)

    try{
      message.channel.send("```Stream Channel set to "+bot.stream_channel+" | "+voice_channel.guild.name+"/"+voice_channel.name+"```")
    }catch{
      message.channel.send("Stream Channel ID provided is invalid.")
    }
  }
}

module.exports.config = {
  name: "live",
  aliases: [],
  args: ["on <id>","off","<id>", "status"],
  usage : ["live <args>"],
  desc: "Set live-mode and/or set stream channel (only for bot owner & streamer)."
}
