const Discord = require("discord.js")
const config = require("../config.json")

const new_sounds = require("../new.json")

module.exports.run = async (bot, message, args) => {
  
  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor(bot.user.username+' new sounds', bot.user.displayAvatarURL(), "");
  
      for (i = 0; i < new_sounds.list.length; i++){
        embed.addField(config.prefix+new_sounds.list[i], '\u200b')	  
      }
      embed.addField("Info", "(*) = collection, (new) = nouveau sons dans une collection")	
  
  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "new",
  aliases: ["hn","helpnew","n"],
  args: [],
  usage: ["new"],
  desc: "Send list of new sounds in a message."
}
