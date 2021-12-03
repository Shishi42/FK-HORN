const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor('Liste des inactifs', bot.user.displayAvatarURL(), "")

//time = []



  message.guild.members.fetch().then(members => {
    members.filter(member => !member.user.bot && !member.hasPermission('ADMINISTRATOR')).forEach(member => {


      message.guild.channels.cache.filter(channel => channel.type === 'text' && (channel.members.get(member.user.id) != undefined)).forEach(channel => {

        //console.log(channel.members.get(member.user.id))
        channel.messages.fetch(force = true).then(messages => {
          temp = messages.filter(message => message.author.id === member.id)

          console.log(member.user.username)
          console.log(channel.name)
          console.log(temp)
          //if(temp != undefined) console.log(temp.content)
          //else console.log("pas de message")
        })
      })
    })
  })


/*  message.guild.members.cache.filter(member => !member.user.bot && !member.hasPermission('ADMINISTRATOR')).forEach(member => {
    console.log(member)
    message.guild.channels.cache.filter(channel => channel.type === 'text' && (channel.members.get(member.user.id) != undefined)).forEach(channel => {

    //console.log(channel.messages.cache.filter(message => message.author.id === member.id).size)
      //if(m.first() != undefined) time.push(m.first().createdTimestamp)

      channel.messages.fetch({limit: 1, author: member.id}).then(messages => {
        last = messages.first()
        //console.log(channel.name)
        //console.log(member.user.username)
        //console.log(last.createdAt)
      })

    });
    //console.log(time.length)



    /*  cache.filter(message => message.member == member)
      console.log(temp)
      //if(temp != undefined) time.push(temp)

      .fetch().then(fetchedMembers => {
          const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
          msg.channel.send(`There are currently ${totalOnline.size} members online in ${msg.guild.name}!`);*/
      //time.push(temp)

    //console.log(temp)

    //embed.addField('@'+member.user.username+'#'+member.user.discriminator, 'Last Message at : '+max(time))



  message.channel.send(embed)
  return message.delete()
}

function max(arr){
  return Math.max.apply(null, arr)
}

module.exports.config = {
  name: "listAfk",
  aliases: ["lafk"],
  args: [],
  usage: ["listafk"],
  desc: "Display list of afk members."
}
