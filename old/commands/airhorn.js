const Discord = require("discord.js")
const config = require("../config.json")

const path = require('path')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel')

  temp = args.split(" ")

  collection_name = temp[0]

  if(bot.live_mode == true && bot.not_safe.list.includes(collection_name) && message.author != config.bot_owner) return message.channel.send("Live mode ON, you can't use this song")

  if(Number.isInteger(parseInt(temp[1]))) sound_arg = parseInt(temp[1])-1
  else sound_arg = temp[1]

  sound_collection = fs.readdirSync(path.join(__dirname, "../audio/"+collection_name))

  if(Number.isInteger(sound_arg)){

    if((sound_arg >= 0) && (sound_arg < sound_collection.length)) song = "../audio/"+collection_name+"/"+sound_collection[sound_arg]
    else song = "../audio/"+collection_name+"/"+sound_collection[Math.floor(Math.random() * sound_collection.length)]

    voice_channel = message.member.voice.channel

    logs(collection_name, sound_collection, song, message, voice_channel.name)

    voice_channel.join().then((connection) => {
      const dispatcher = connection.play(path.join(__dirname, song))
      dispatcher.on("finish", () => voice_channel.leave())
    }).catch((error) =>{
      console.error(error)
      voice_channel.leave()
    })

  }

  function logs(collection_name, sound_collection, song, message, channel){
    temp_date = message.createdAt
    date = "["+temp_date.getHours()+":"+temp_date.getMinutes()+":"+temp_date.getSeconds()+" - "+temp_date.getDate()+" "+bot.months[temp_date.getMonth()]+" "+temp_date.getFullYear()+"]"
    logs = "Playing : "+ collection_name +" : " + song + " | at "+date+" | on "+message.channel.guild.name+"/"+message.channel.name+" -> "+message.channel.guild.name+"/"+channel+" | by "+message.author.tag+"."

    fs.appendFileSync('logs.txt', logs+"\n", function (err){})

    console.log(logs)
  }

}

module.exports.config = {
  name: "airhorn",
  aliases: [],
  args: ["number"],
  usage: ["<sound>", "<sound> <number>"],
  desc: "Play in your voice channel the selected sound, if no number provided, sound is random."
}
