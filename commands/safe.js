const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {

  str_snd = "```\n"
  for (i = 0; i < bot.sound_collections.length; i++){
    if(!bot.not_safe.list.includes(bot.sound_collections[i])){
      temp = fs.readdirSync(path.join(__dirname, "/audio/"+bot.sound_collections[i]))
      if(temp.length > 1) str_snd += "!"+bot.sound_collections[i]+" ("+temp.length+" sounds)\n"
      else str_snd += "!"+bot.sound_collections[i]+"\n"
    }
  }
  str_snd += "These commands can be used everytime"
  str_snd += "```"
  message.channel.send('Airhorn safe sound list ('+bot.sound_collections.length+') : \n'+str_snd)

  return message.delete()
}

module.exports.config = {
  name: "safe",
  aliases: ["sfw"],
  args: [],
  usage : ["safe"],
  desc: "Display safe sound list."
}
