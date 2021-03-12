const Discord = require("discord.js")
const config = require("../config.json");


module.exports.run = async (bot, message, args) => {

  commands = Array.from(bot.commands.keys());

  str_snd = "```\n"
  for (i = 0; i < bot.sound_collections.length; i++){
    temp = fs.readdirSync(path.join(__dirname, "/audio/"+bot.sound_collections[i]))
    if(temp.length > 1) str_snd += "!"+bot.sound_collections[i]+"(*)\n"
    else str_snd += "!"+bot.sound_collections[i]+"\n"
  }
  str_snd += "```"

  str_cmd = "```\n"
  for (i = 0; i < commands.length; i++){
    str_cmd += "!"+commands[i]+"\n"
  }
  str_cmd += "```"

  message.channel.send('Airhorn sound list ('+bot.sound_collections.length+') : \n'+str_snd);
  message.channel.send('Command list ('+commands.length+') : \n'+str_cmd);

  return message.delete()
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"]
}
