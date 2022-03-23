const Discord = require("discord.js")
const config = require("../config.json")
const auth = require("@twurple/auth")
const pubsub = require("@twurple/pubsub")

const path = require('path')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  if(!message.startsWith("rewards")) return

  bot.pubSub_client = new pubsub.PubSubClient()
  const userId = await bot.pubSub_client.registerUserListener(bot.authfk)

  bot.reward_listener = await bot.pubSub_client.onRedemption(userId, (message) => {
    if(message.rewardId === "5ce790a1-9c02-43b7-8812-2d858a20190d") command = "siuuu"
    else if(message.rewardId === "8026ca3a-c878-486a-93ce-4cb99d10c405") command = "airhorn"
    else if(message.rewardId === "adeac38c-f07b-4a44-851a-e9b2514ca4ee") command = "sheesh"
    else if(message.rewardId === "c87e9471-8fe1-4fe4-bcf2-76bc92316a99") command = "melokrik"
    else if(message.rewardId === "d63037ce-b1e2-42c2-a4a8-d75952dbb144") command = "sourire"

    bot.commands.get("airhornlive").run(bot, "twitch_rewards:"+message.userDisplayName, command)
  })

}

module.exports.config = {
  name: "rewards",
  aliases: [],
  args: [],
  usage: ["Can't be use"],
  desc: "Setup the reward system at startup."
}
