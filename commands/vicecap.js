const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')){
    return message.channel.send("T'es pas admin casse toi.")
  }

  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor('Tirage des vice-capitaines', bot.user.displayAvatarURL(), "")
      .setDescription('Les élus du mois sont :');

  var ban = Array.from(message.mentions.users.keys())

  if(!isNaN(parseInt(args[0])) && parseInt(args[0]) <= 5 && parseInt(args[0]) > 0) nbTir = parseInt(args[0])
  else nbTir = 2

  elu = []

  console.log('Début Tirage ('+nbTir+')')

  for(i = 0; i < nbTir; i++){
    do{
      tir = message.guild.members.cache.random()

      if(tir.user.bot == true) console.log('FAIL : '+tir.user.username+' -> BOT')
      else if(tir._roles.includes('474666848462307338')) console.log('FAIL : '+tir.user.username+' -> Déjà Capitaine')
      else if(tir._roles.includes('474666806192111628')) console.log('FAIL : '+tir.user.username+' -> Déjà Vice-Capitaine')
      else if(elu.includes(tir.user.id)) console.log('FAIL : '+tir.user.username+' -> Déjà Elu')
      else if(ban.includes(tir.user.id)) console.log('FAIL : '+tir.user.username+' -> BAN')
      else console.log('HIT : '+tir.user.username)
    }
    while(tir.user.bot == true || tir._roles.includes('474666848462307338') || tir._roles.includes('474666806192111628') || ban.includes(tir.user.id) || elu.includes(tir.user.id))
    elu.push(tir.user.id)
  }

  elu.forEach(id => {
    usr = message.guild.members.cache.get(id)
    if(usr.nickname == null) name = usr.user.username
    else name = usr.nickname
    embed.addField(name, '@'+usr.user.username+'#'+usr.user.discriminator)
  });

  logs(message, elu, ban)

  function logs(message, tirs, bans){
    temp_date = message.createdAt
    date = "["+temp_date.getHours()+":"+temp_date.getMinutes()+":"+temp_date.getSeconds()+" - "+temp_date.getDate()+" "+bot.months[temp_date.getMonth()]+" "+temp_date.getFullYear()+"]"

    temp_name = []
    elu.forEach(tir => {
      usr = message.guild.members.cache.get(tir).user
      temp_name.push('@'+usr.username+'#'+usr.discriminator)
    });

    temp_ban = []
    bans.forEach(ban => {
      usr = message.guild.members.cache.get(ban).user
      temp_ban.push('@'+usr.username+'#'+usr.discriminator)
    });
    if(temp_ban.length == 0) temp_ban.push("NO BAN")

    logs = 'Tirage vice-capitaine par '+message.author.username+': '+temp_name+' --> fait le '+date+'. BAN : '+temp_ban

    fs.appendFileSync('logs.txt', logs+"\n", function (err){});

    console.log(logs);
  }

  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "vicecap",
  aliases: ["vc","vcp"],
  args: ["number_of_draw","@removed_member"],
  usage: ["vicecap <args>"],
  desc: "Choose a number of vice-captain from a random non-captain non-removed non-bot member of the server."
}
