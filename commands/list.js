const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {

  str_snd = "```\n"
  for (i = 0; i < bot.sound_collections.length; i++){
    temp = fs.readdirSync(path.join(__dirname, "/audio/"+bot.sound_collections[i]))
    if(temp.length > 1) str_snd += "!"+bot.sound_collections[i]+" (*)\n"
    else str_snd += "!"+bot.sound_collections[i]+"\n"
  }
  str_snd += "---------------------\n(*) = collection\n```"

  message.channel.send('Airhorn sound list ('+bot.sound_collections.length+') : \n'+str_snd)

  return message.delete()
}

module.exports.config = {
  name: "list",
  aliases: ["l"],
  args: [""],
  desc: "prints the list of sounds in a message"
}
