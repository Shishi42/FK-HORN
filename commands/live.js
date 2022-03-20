const Discord = require("discord.js")
const config = require("../config.json")
const auth = require("@twurple/auth")
const pubsub = require("@twurple/pubsub")

module.exports.run = async (bot, message, args) => {
  if(message.member != config.bot_owner) return message.reply("You must be bot owner")
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

    bot.pubSub_client = new pubsub.PubSubClient()
    const userId = await bot.pubSub_client.registerUserListener(bot.authfk)

    bot.reward_listener = await bot.pubSub_client.onRedemption(userId, (message) => {
      console.log(message.rewardId)
      console.log(message.redemptionDate)
      console.log(message.rewardCost)
      console.log(message.userDisplayName)
    })

  }else if(args[0].toUpperCase() == "OFF"){
    bot.live_mode = false
    message.channel.send("```Live-mode set to OFF```")

    if(bot.reward_listener !== undefined) bot.reward_listener.remove()

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
  desc: "Set live-mode and/or set stream channel (only for bot owner)."
}
