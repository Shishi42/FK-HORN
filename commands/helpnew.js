const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {
  return message.channel.send('New sounds ('+collections.new.length+') : !['+collections.new+']');
}

module.exports.config = {
  name: "helpnew",
  aliases: ["hn","helpnew"]
}
