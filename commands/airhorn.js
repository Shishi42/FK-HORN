const Discord = require("discord.js")
const config = require("../config.json")

const path = require('path')
const fs = require("fs")
const jsonfile = require ("jsonfile")

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

  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel')
  
  temp = args.split(" ")
    console.log(args)
  console.log(temp)

  collection_name = temp[0]
  sound_number = parseInt(temp[1])
    console.log(sound_number)
  sound_collection = fs.readdirSync(path.join(__dirname, "/audio/"+collection_name))
  
  if((sound_number != -1) && (sound_number >= 0) && (sound_number <= sound_collection.length)) song = "./audio/"+collection_name+"/"+sound_collection[Math.floor(Math.random() * sound_collection.length)]
  else song = "./audio/"+collection_name+"/"+sound_collection[sound_number]

  logs(collection_name, sound_collection, song, message)

  voice_channel = message.member.voice.channel

  voice_channel.join().then((connection) => {
    const dispatcher = connection.play(path.join(__dirname, song))
    dispatcher.on("finish", () => voice_channel.leave());
  })

  function logs(collection_name, sound_collection, song, message){
    stats(collection_name)
    temp_date = message.createdAt
    date = "["+temp_date.getHours()+":"+temp_date.getMinutes()+":"+temp_date.getSeconds()+" - "+temp_date.getDate()+" "+months[temp_date.getMonth()]+" "+temp_date.getFullYear()+"]"
    logs = "Playing : "+ collection_name +" : " + song + " | at "+date+" | on "+message.channel.guild.name+"/"+message.channel.name+" | by "+message.author.tag+"."

    fs.appendFileSync('logs.txt', logs+"\n", function (err){});

    console.log(logs);
  }

  function stats(collection_name){
    if(fs.existsSync("stats.json")) stats = jsonfile.readFileSync("stats.json")
    else{
      fs.appendFileSync("stats.json", "", function(err) {})
      stats = {}
    }
    if(stats[collection_name] == undefined) stats[collection_name] = 1
    else stats[collection_name] += 1
    fs.unlink("stats.json", function(err) {})
    fs.appendFileSync("stats.json", JSON.stringify(stats, null, 4), function(err) {})
  }
}

module.exports.config = {
  name: "airhorn",
  aliases: [],
  args: ["number"],
  usage: ["<sound> <number>"],
  desc: "Play in your voice channel the selected sound, if no number provided, sound is random."
}
