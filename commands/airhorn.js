const Discord = require("discord.js")
const config = require("../config.json");
const path = require('path');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel');

  collection_name = args
  sound_collection = fs.readdirSync(path.join(__dirname, "/audio/"+collection_name))

  song = "./audio/"+collection_name+"/"+sound_collection[Math.floor(Math.random() * sound_collection.length)];
  console.log("Playing collections : "+ collection_name +", file: " + song);

  message.member.voice.channel.join().then((connection) => {
    const dispatcher = connection.play(path.join(__dirname, song))
    dispatcher.on("finish", () => message.member.voice.channel.leave());
  })

}

module.exports.config = {
  name: "airhorn",
  aliases: ["horn","ah"]
}
