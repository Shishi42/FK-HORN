const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {

  commands = Array.from(bot.commands.keys())
  
  if(args[0] != undefined){
    if(commands.includes(args[0]){
       str = "```\n"
       str += "command : "+args[0]
       str += "aliases : "+bot.commands.get(bot.aliases.get(args[0]))
       str += "description : "+bot.commands.get(bot.desc.get(args[0]))
       str += "possible argument : "+bot.commands.get(bot.args.get(args[0]))
       str += "```"
       message.channel.send(str)
    }
    
  }else{

    str_snd = "```\n"
    for (i = 0; i < bot.sound_collections.length; i++){
      temp = fs.readdirSync(path.join(__dirname, "/audio/"+bot.sound_collections[i]))
      if(temp.length > 1) str_snd += "!"+bot.sound_collections[i]+" (*)\n"
      else str_snd += "!"+bot.sound_collections[i]+"\n"
    }
    str_snd += "---------------------\n(*) = collection\n```"

    str_cmd = "```\n"
    for (i = 0; i < commands.length; i++){
      str_cmd += "!"+commands[i]+"\n"
    }
    str_cmd += "```"

    message.channel.send('Airhorn sound list ('+bot.sound_collections.length+') : \n'+str_snd)
    message.channel.send('Command list ('+commands.length+') : \n'+str_cmd)

  }
  
  return message.delete()
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"],
  args: ["<commands>"],
  desc: "prints the commands and list of sounds in a message"
}
