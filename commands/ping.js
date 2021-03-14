const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  message.channel.send("Pinging...").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp
    m.edit(`BOT ping : ${ping}, API ping : ${Math.round(bot.ws.ping)}`)
  })
}

module.exports.config = {
  name: "pg",
  aliases: ["ping","p"],
  args: [""],
  desc: "returns the bot ping in a message"
}
