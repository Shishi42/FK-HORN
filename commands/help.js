const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {

  commands = Array.from(bot.commands.keys())
  
  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp();
  
  if(commands.includes(args[0])){
      
    embed.setAuthor((args[0].charAt(0).toUpperCase() + args[0].slice(1))+" Command Help", bot.user.displayAvatarURL(), "")
    embed.setDescription([
      `**❯ Description:** ${bot.commands.get(args[0]).config.desc}`,
      `**❯ Aliases:** ${bot.commands.get(args[0]).config.aliases}`,
      `**❯ Arguments:** ${bot.commands.get(args[0]).config.args}`
    ])
  }else{
    
    embed.setAuthor(bot.user.username+' Help Menu', bot.user.displayAvatarURL(), "")
    embed.setDescription([
	`Available commands for $bot.user.username}`,
	`The bot's prefix is: ${config.prefix}`
	]);
    for (i = 0; i < commands.length; i++){
      embed.addField(commands[i], bot.commands.get(commands[i]).config.desc)
    }
  }
  
  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"],
  args: ["<commands>"],
  desc: "prints the commands and list of sounds in a message"
}
