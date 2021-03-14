const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {
    
  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor(bot.user.username+' Sound List', bot.user.displayAvatarURL(), "");
    
      for (i = 0; i < bot.sound_collections.length; i++){
        str = ""  
        temp = fs.readdirSync(path.join(__dirname, "/audio/"+bot.sound_collections[i]))
        if(temp.length > 1) str += config.prefix+bot.sound_collections[i]+ " ("+temp.length+") sounds.\n"
        else str += config.prefix+bot.sound_collections[i]+"\n"
      }
        
      console.log(str)  
      embed.addField(str, '\u200b') 
  
  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "list",
  aliases: ["l"],
  args: [],
  usage : ["list"],
  desc: "Display sound list."
}
