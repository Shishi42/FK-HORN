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

  if(!message.startsWith("twitch")) return

  collection_name = args
  if(bot.not_safe.list.includes(collection_name)) return

  sound_collection = fs.readdirSync(path.join(__dirname, "../audio/"+collection_name))
  song = "../audio/"+collection_name+"/"+sound_collection[Math.floor(Math.random() * sound_collection.length)]

  logs(collection_name, sound_collection, song, message.split(":")[1])

  voice_channel = bot.channels.cache.get(bot.stream_channel)

  if(voice_channel != undefined){
    voice_channel.join().then((connection) => {
      const dispatcher = connection.play(path.join(__dirname, song))
      dispatcher.on("finish", () => voice_channel.leave());
    }).catch((error) =>{
      console.error(error)
      voice_channel.leave()
    })
  }

  function logs(collection_name, sound_collection, song, author){
    stats(collection_name)
    temp_date = new Date()
    date = "["+temp_date.getHours()+":"+temp_date.getMinutes()+":"+temp_date.getSeconds()+" - "+temp_date.getDate()+" "+months[temp_date.getMonth()]+" "+temp_date.getFullYear()+"]"
    logs = "Playing : "+ collection_name +" : " + song + " | at "+date+" | by "+author+" on TWITCH."

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
  name: "airhornlive",
  aliases: [],
  args: [],
  usage: ["Can't be use on Discord"],
  desc: "Play in the twitch live channel the selected sound, sound is random."
}
