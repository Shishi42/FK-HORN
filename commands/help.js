const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {
  
  str_snd = "```\n"  
  for (i = 0; i < collections.list.length; i++){
    str_snd += "!"+collections.list[i]+"\n"
  }
  str_snd += "```"
  
  str_cmd = "```\n"  
  for (i = 0; i < collections.commands.length; i++){
    str_cmd += "!"+collections.commands[i]+"\n"
  }
  str_cmd += "```"

  message.channel.send('Airhorn sound list ('+collections.list.length+') : \n'+str_snd);
  message.channel.send('Command list ('+collections.commands.length+') : \n'+str_cmd);
  
  return message.delete()
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"]
}
