const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {

  str = "```\n"  
  for (i = 0; i < collections.list.length; i++){
    str += "!"+collections.list[i]+"\n"
  }
  str += "```"

  message.channel.send('Airhorn sound list ('+collections.list.length+') : \n'+str);
  return message.channel.send('Command List : [google,help,helpnew,ping,say,uptime]');
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"]
}
