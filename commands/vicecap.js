const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send("T'es pas admin casse toi.")
    return message.delete()
  }

  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor('Tirage des vice-capitaines', bot.user.displayAvatarURL(), "")
      .setDescription('Les élus du mois sont :');

  var ban = Array.from(message.mentions.users.keys())

  do{
    vc1 = message.guild.members.cache.random()
  }
  while(vc1.user.bot == true || vc1._roles.includes('474666848462307338') || vc1._roles.includes('474666806192111628') || ban.includes(vc1.user.id))

  if(vc1.nickname == null) name = vc1.user.username
  else name = vc1.nickname
  embed.addField(name, '@'+vc1.user.username+'#'+vc1.user.discriminator)

  if(args[0] != '1'){
    do{
      vc2 = message.guild.members.cache.random()
    }
    while(vc2.user.bot == true || vc2._roles.includes('474666848462307338') || vc2._roles.includes('474666806192111628') || ban.includes(vc2.user.id) || vc1.id == vc2.id);

    if(vc2.nickname == null) name = vc2.user.username
    else name = vc2.nickname
    embed.addField(name, '@'+vc2.user.username+'#'+vc2.user.discriminator)

    logs(message, vc1.user.username, vc2.user.username)
  }
  else{
    logs(message, vc1.user.username, "NULL")
  }

  function logs(message, vc1, vc2){
    temp_date = message.createdAt
    date = "["+temp_date.getHours()+":"+temp_date.getMinutes()+":"+temp_date.getSeconds()+" - "+temp_date.getDate()+" "+months[temp_date.getMonth()]+" "+temp_date.getFullYear()+"]"

    logs = 'Tirage vice-capitaine par '+message.author.username+': #1 '+vc1+', #2 '+vc2+' --> fait le '+date+'.'
    fs.appendFileSync('logs.txt', logs+"\n", function (err){});

    console.log(logs);
  }

  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "vicecap",
  aliases: ["vc","vcp"],
  args: ["1","@removed_member"],
  usage: ["vicecap <1> <args>"],
  desc: "Choose a vice-captain from a random non-captain non-removed non-bot member of the server."
}
