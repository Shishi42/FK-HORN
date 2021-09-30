const Discord = require("discord.js")
const config = require("../config.json")

const new_sounds = require("../new.json")

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor(bot.user.username+' New Sounds List ('+new_sounds.list.length+' new)', bot.user.displayAvatarURL(), "");

      for (i = 0; i < new_sounds.list.length; i++){
        embed.addField(config.prefix+new_sounds.list[i], '\u200b')
      }
      embed.addField("Infos", "(x) = collection with x sounds, (x:new) = x new sounds in collection.")

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
