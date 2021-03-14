const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")
const path = require('path')

module.exports.run = async (bot, message, args) => {

  commands = Array.from(bot.commands.keys())
  
  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setAuthor(bot.user.username+' Help Menu', bot.user.displayAvatarURL(), "")
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp();
  
  if(commands.includes(args[0])){
      
    embed.setAuthor((args[0].charAt(0).toUpperCase() + args[0].slice(1))+" Command Help", bot.user.displayAvatarURL(), "")
    embed.setDescription([
      `**=> Description:** ${bot.commands.get(args[0]).config.desc}`,
      `**=> Aliases:** ${bot.commands.get(args[0]).config.aliases}`,
      `**=> Arguments:** ${bot.commands.get(args[0]).config.args}`
    ])
    
    
     str = "```\n"
     str += args[0]+" Command Help\n"
     str += "aliases : "+bot.commands.get(args[0]).config.aliases+"\n"
     str += "possible argument : "+bot.commands.get(args[0]).config.args+"\n"
     str += "description : "+bot.commands.get(args[0]).config.desc+"\n"
     str += "```"
    
    // message.channel.send(str)
     message.channel.send(embed)
  }else{

    str_cmd = "```\n"
    for (i = 0; i < commands.length; i++){
      str_cmd += "!"+commands[i]+"\n"
    }
    str_cmd += "```"
    
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
