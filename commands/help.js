const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {
  return message.channel.send('usage : !['+collections.list+']');
}

module.exports.config = {
  name: "help",
  aliases: ["h"]
}
