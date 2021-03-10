const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {
  str = "```\n"
  collections.new.forEach(elm){
    str += "!"+elm+"\n"
  }
  str += "```"
  
  return message.channel.send('New sounds ('+collections.new.length+') : \n'+str);
}

module.exports.config = {
  name: "helpnew",
  aliases: ["hn","helpnew"]
}
