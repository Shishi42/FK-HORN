const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  if(message.member != config.bot_owner &&
    message.guild.members.cache.get(message.member.id).roles.cache.get(message.guild.roles.cache.find(r => r.name === "MDJ").id) == undefined &&
    !message.member.hasPermission('ADMINISTRATOR'))

    return message.reply("T'es ni MDJ ni admin ni Shishi mon reuf :face_with_raised_eyebrow:")

  players = message.mentions.members
  players_array = Array.from(message.mentions.members)
  roles = args.filter(arg => !arg.startsWith("<"))

  if(players_array.length != roles.length)
    return message.channel.send(`Number of players and available roles are differents (${players_array.length} player(s) for ${roles.length} role(s).)`)

  old_alive_role = message.guild.roles.cache.find(r => r.name === "Vivant")
  dead_role = message.guild.roles.cache.find(r => r.name === "Mort")

  await purge_role(old_alive_role.id, dead_role.id)

  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor('Tirage des roles pour LG', bot.user.displayAvatarURL(), "")

  for(i=0; i<players_array.length; i++){
    random_id = Math.floor(Math.random() * roles.length)
    embed.addField(roles[random_id], players_array[i][1])
    roles.splice(random_id, 1)
  }

  await message.guild.roles.fetch();
  alive_role = message.guild.roles.cache.find(r => r.name === "Vivant")

  try{
    players.forEach((p, i) => {
      p.roles.add(alive_role)
    });
  }catch(error){
    console.error(error)
  }

  message.guild.channels.cache.get(config.mdj).send(embed)
  return message.delete()

  function purge_role(alive_id, dead_id){
    const alive_role = message.guild.roles.cache.get(alive_id);
    message.guild.roles.create({
    data: {
    name: alive_role.name,
    color: alive_role.color,
    hoist: alive_role.hoist,
    position: alive_role.position,
    permissions: alive_role.permissions,
    mentionable: alive_role.mentionable
    }
    })
    alive_role.delete('I had to.')

    const dead_role = message.guild.roles.cache.get(dead_id);
    message.guild.roles.create({
    data: {
    name: dead_role.name,
    color: dead_role.color,
    hoist: dead_role.hoist,
    position: dead_role.position,
    permissions: dead_role.permissions,
    mentionable: dead_role.mentionable
    }
    })
    dead_role.delete('I had to.')
  }
}

module.exports.config = {
  name: "lg",
  aliases: [],
  args: ["@players", "role list"],
  usage: ["lg <args>"],
  desc: "Start a game of LG."
}
