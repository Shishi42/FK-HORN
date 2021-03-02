const Discord = require("discord.js")
const config = require("../config.json");
const collections = require("../collections.json");

module.exports.run = async (bot, message, args) => {
  message.channel.send('Airhorn usage : !['+collections.list+']');
  return message.channel.send('Command List : [google,help,ping,say,uptime]');
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"]
}
