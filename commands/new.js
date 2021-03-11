const Discord = require("discord.js")
const config = require("../config.json");
const new_sounds = require("../new.json");

module.exports.run = async (bot, message, args) => {

  str = "```\n"
  for (i = 0; i < new_sounds.list.length; i++){
    str += "!"+new_sounds.list[i]+"\n"
  }
  str += "```"

  message.channel.send('New sounds ('+new_sounds.list.length+') : \n'+str);

  return message.delete()
}

module.exports.config = {
  name: "new",
  aliases: ["hn","helpnew"]
}
